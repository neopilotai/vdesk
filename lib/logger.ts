/**
 * Centralized logging module with colored output
 * Uses ansis for terminal color formatting
 */

import ansis from "ansis";

export const logger = console;

/**
 * Converts arguments to readable strings for logging
 * Objects are JSON stringified, primitives are converted to strings
 * @param arg - The argument to stringify
 * @returns A string representation of the argument
 */
const stringifyArg = (arg: unknown) =>
  typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg);

/**
 * Logs error messages in red with error badge
 * Used for critical errors and failures that need attention
 * @param args - Error message and additional context
 */
export const logError = (...args: Parameters<typeof console.error>) => {
  console.error(
    ansis.bgRedBright.white(" ERROR "),
    ansis.redBright(args.map(stringifyArg).join(" "))
  );
};

/**
 * Logs debug messages in blue with debug badge
 * Only displayed in development environments
 * @param args - Debug message and additional context
 */
export const logDebug = (...args: Parameters<typeof console.debug>) => {
  console.debug(
    ansis.bgBlueBright.white(" DEBUG "),
    ansis.blueBright(args.map(stringifyArg).join(" "))
  );
};

/**
 * Logs success messages in green with success badge
 * Used to indicate successful operations or completions
 * @param args - Success message and additional context
 */
export const logSuccess = (...args: Parameters<typeof console.log>) => {
  console.log(
    ansis.bgGreenBright.white(" SUCCESS "),
    ansis.greenBright(args.map(stringifyArg).join(" "))
  );
};

/**
 * Logs warning messages in yellow with warning badge
 * Used for warnings about potentially problematic conditions
 * @param args - Warning message and additional context
 */
export const logWarning = (...args: Parameters<typeof console.warn>) => {
  console.warn(
    ansis.bgYellowBright.white(" WARNING "),
    ansis.yellowBright(args.map(stringifyArg).join(" "))
  );
};
