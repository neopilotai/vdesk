/**
 * Input validation schemas using Zod
 * Ensures all user input and API requests are properly validated
 */

import { z } from "zod";
import { ComputerModel, SSEEventType } from "@/types/api";

/**
 * Schema for chat message validation
 */
export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z
    .string()
    .min(1, "Message content cannot be empty")
    .max(10000, "Message content is too long"),
});

/**
 * Schema for send message request validation
 */
export const SendMessageSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(10000),
      })
    )
    .min(1, "At least one message is required"),
  sandboxId: z.string().optional(),
  environment: z.string().optional(),
  resolution: z.tuple([z.number(), z.number()]).optional(),
  model: z.enum(["openai", "anthropic"]).optional().default("openai"),
});

/**
 * Schema for user input validation
 */
export const UserInputSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(5000, "Message is too long")
    .trim(),
});

/**
 * Type inference from schemas
 */
export type SendMessageRequest = z.infer<typeof SendMessageSchema>;
export type UserInput = z.infer<typeof UserInputSchema>;

/**
 * Safe validation helper that returns null on error
 */
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T | null {
  try {
    return schema.parse(data);
  } catch (error) {
    return null;
  }
}

/**
 * Validation helper that throws with detailed error message
 */
export function validateInputStrict<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context: string = "Input validation"
): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("; ");
      throw new Error(`${context} failed: ${errorMessages}`);
    }
    throw error;
  }
}
