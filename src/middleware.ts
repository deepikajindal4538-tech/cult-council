import { NextResponse, type NextRequest } from "next/server";
import { rateLimiter } from "./lib/rateLimit";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limiting for all /api/* routes
  if (pathname.startsWith("/api/")) {
    const ip = getClientIp(request);
    const rateLimit = rateLimiter.check(ip);

    if (!rateLimit.success) {
      return new NextResponse(
        JSON.stringify({ error: "Rate limit exceeded. Please wait before retrying." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(rateLimit.reset - Math.floor(Date.now() / 1000)),
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimit.reset),
          },
        }
      );
    }
  }

  // Security headers for all responses
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // Strict CSP - Only upgrade insecure requests in production HTTPS environments
  const isProd = process.env.NODE_ENV === "production";
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://*.staticflickr.com https://live.staticflickr.com;
    font-src 'self' data: https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    ${isProd ? "upgrade-insecure-requests;" : ""}
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
