/**
 * Retry logic utility with exponential backoff
 * Used for resilient API calls and transient failure recovery
 */

import { logError, logWarning } from "../logger";

interface RetryOptions {
  maxAttempts?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffMultiplier?: number;
  shouldRetry?: (error: Error, attempt: number) => boolean;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelayMs: 1000,
  maxDelayMs: 10000,
  backoffMultiplier: 2,
  shouldRetry: (error) => {
    // Retry on network errors, timeouts, and 5xx server errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return true;
    }
    return false;
  },
};

/**
 * Executes a function with exponential backoff retry logic
 * @param fn - Async function to execute
 * @param options - Retry configuration options
 * @returns Promise with the function result
 */
export async function retryWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      lastError = err;

      // Check if we should retry
      if (!config.shouldRetry(err, attempt)) {
        throw err;
      }

      // Don't delay on the last attempt
      if (attempt < config.maxAttempts) {
        const delayMs = Math.min(
          config.initialDelayMs * Math.pow(config.backoffMultiplier, attempt - 1),
          config.maxDelayMs
        );

        logWarning(
          `Retry attempt ${attempt}/${config.maxAttempts} after ${delayMs}ms. Error: ${err.message}`
        );

        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  if (lastError) {
    logError(
      `Failed after ${config.maxAttempts} attempts:`,
      lastError.message
    );
    throw lastError;
  }

  throw new Error("Unexpected error in retry logic");
}

/**
 * Wraps a fetch call with retry logic
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @param retryOptions - Retry configuration
 * @returns Promise with the fetch response
 */
export async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retryOptions: RetryOptions = {}
): Promise<Response> {
  return retryWithExponentialBackoff(
    () => fetch(url, options),
    {
      ...retryOptions,
      shouldRetry: (error, attempt) => {
        // Custom logic for fetch retry decisions
        if (error instanceof TypeError) {
          return true; // Network error
        }
        return retryOptions.shouldRetry?.(error, attempt) ?? false;
      },
    }
  );
}
