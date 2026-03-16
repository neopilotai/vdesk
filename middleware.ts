/**
 * Security middleware for the application
 * Handles CORS protection, request validation, and security headers
 */

import { NextRequest, NextResponse } from "next/server";
import { logWarning } from "@/lib/logger";

/**
 * Middleware that runs for all requests
 * Provides security headers and request validation
 */
export function middleware(request: NextRequest) {
  // Only process API routes
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Set security headers
  const response = NextResponse.next();

  // Prevent clickjacking attacks
  response.headers.set("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Enable XSS protection
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // Content Security Policy - restrictive by default
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  );

  // Prevent referrer information leakage
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Validate request method
  if (request.method === "POST") {
    const contentType = request.headers.get("content-type");

    // Only allow JSON content
    if (!contentType?.includes("application/json")) {
      logWarning(
        `Invalid Content-Type for POST request: ${contentType || "missing"}`
      );
      return new NextResponse("Invalid Content-Type. Expected application/json", {
        status: 400,
      });
    }
  }

  // Validate request size to prevent large payload attacks
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const maxSize = 1024 * 1024; // 1MB
    const size = parseInt(contentLength, 10);

    if (size > maxSize) {
      logWarning(
        `Request payload too large: ${size} bytes (max: ${maxSize} bytes)`
      );
      return new NextResponse("Payload too large", { status: 413 });
    }
  }

  return response;
}

/**
 * Configure which routes to apply middleware to
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
