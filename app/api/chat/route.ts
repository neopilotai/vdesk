import { Sandbox } from "@vdesk/desktop";
import { ComputerModel, SSEEvent, SSEEventType } from "@/types/api";
import {
  ComputerInteractionStreamerFacade,
  createStreamingResponse,
} from "@/lib/streaming";
import { SANDBOX_TIMEOUT_MS } from "@/lib/config";
import { OpenAIComputerStreamer } from "@/lib/streaming/openai";
import { logError } from "@/lib/logger";
import { ResolutionScaler } from "@/lib/streaming/resolution";
import { validateInputStrict, SendMessageSchema } from "@/lib/utils/validation";

export const maxDuration = 800;

/**
 * Validates that all required environment variables are set
 */
function validateEnvironmentVariables(): void {
  const requiredVars = ["VDESK_API_KEY"];
  const missingVars = requiredVars.filter((v) => !process.env[v]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

class StreamerFactory {
  static getStreamer(
    model: ComputerModel,
    desktop: Sandbox,
    resolution: [number, number]
  ): ComputerInteractionStreamerFacade {
    const resolutionScaler = new ResolutionScaler(desktop, resolution);

    switch (model) {
      case "anthropic":
      // currently not implemented
      /* return new AnthropicComputerStreamer(desktop, resolutionScaler); */
      case "openai":
      default:
        return new OpenAIComputerStreamer(desktop, resolutionScaler);
    }
  }
}

export async function POST(request: Request) {
  const abortController = new AbortController();
  const { signal } = abortController;

  request.signal.addEventListener("abort", () => {
    abortController.abort();
  });

  try {
    // Validate environment variables on each request
    validateEnvironmentVariables();

    // Parse and validate request body
    const requestBody = await request.json();
    const validatedData = validateInputStrict(
      SendMessageSchema,
      requestBody,
      "Chat API request"
    );

    const { messages, sandboxId, resolution, model = "openai" } = validatedData;
    const apiKey = process.env.VDESK_API_KEY;

    let desktop: Sandbox | undefined;
    let activeSandboxId = sandboxId;
    let vncUrl: string | undefined;

    if (!activeSandboxId) {
      const newSandbox = await Sandbox.create({
        resolution,
        dpi: 96,
        timeoutMs: SANDBOX_TIMEOUT_MS,
      });

      await newSandbox.stream.start();

      activeSandboxId = newSandbox.sandboxId;
      vncUrl = newSandbox.stream.getUrl();
      desktop = newSandbox;
    } else {
      desktop = await Sandbox.connect(activeSandboxId);
    }

    if (!desktop) {
      logError("Failed to create or connect to sandbox");
      return new Response("Failed to connect to sandbox", { status: 500 });
    }

    desktop.setTimeout(SANDBOX_TIMEOUT_MS);

    const streamer = StreamerFactory.getStreamer(
      model as ComputerModel,
      desktop,
      resolution
    );

    if (!sandboxId && activeSandboxId && vncUrl) {
      async function* stream(): AsyncGenerator<SSEEvent<typeof model>> {
        yield {
          type: SSEEventType.SANDBOX_CREATED,
          sandboxId: activeSandboxId,
          vncUrl: vncUrl as string,
        };

        yield* streamer.stream({ messages, signal });
      }

      return createStreamingResponse(stream());
    } else {
      return createStreamingResponse(streamer.stream({ messages, signal }));
    }
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));

    // Handle validation errors with 400 status
    if (err.message.includes("validation failed")) {
      logError("Validation error:", err.message);
      return new Response(err.message, { status: 400 });
    }

    // Handle missing environment variables with 500 status
    if (err.message.includes("environment variables")) {
      logError("Configuration error:", err.message);
      return new Response("Server configuration error", { status: 500 });
    }

    logError("Error in chat API:", err.message);
    return new Response("An error occurred. Please try again.", {
      status: 500,
    });
  }
}
