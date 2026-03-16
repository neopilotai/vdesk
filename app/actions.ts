"use server";

import { SANDBOX_TIMEOUT_MS } from "@/lib/config";
import { Sandbox } from "@vdesk/desktop";
import { logError } from "@/lib/logger";

/**
 * Extends the sandbox instance timeout by the configured duration
 * Called when the user wants to continue using a sandbox that's about to expire
 * @param sandboxId - The ID of the sandbox to extend
 * @returns true if successful, false if error occurs
 */
export async function increaseTimeout(sandboxId: string) {
  try {
    const desktop = await Sandbox.connect(sandboxId);
    await desktop.setTimeout(SANDBOX_TIMEOUT_MS);
    return true;
  } catch (error) {
    logError("Failed to increase timeout for sandbox:", sandboxId, error);
    return false;
  }
}

/**
 * Stops and kills a sandbox instance
 * Performs cleanup and release of resources associated with the sandbox
 * @param sandboxId - The ID of the sandbox to stop
 * @returns true if successful, false if error occurs
 */
export async function stopSandboxAction(sandboxId: string) {
  try {
    const desktop = await Sandbox.connect(sandboxId);
    await desktop.kill();
    return true;
  } catch (error) {
    logError("Failed to stop sandbox:", sandboxId, error);
    return false;
  }
}
