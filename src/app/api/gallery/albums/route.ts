import { NextRequest, NextResponse } from "next/server";
import { getAlbumsWithFallback, FlickrClientError } from "@/lib/flickr/client";
import { rateLimiter } from "@/lib/rateLimit";
import { ZodError } from "zod";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export async function GET(req: NextRequest) {
  // 1. Rate limiting per IP
  const ip = getClientIp(req);
  const rateLimitResult = rateLimiter.check(ip);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.reset - Math.floor(Date.now() / 1000)),
          "X-RateLimit-Limit": String(rateLimitResult.limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateLimitResult.reset),
        },
      }
    );
  }

  // 2. Query parsing & execution
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : undefined;
    const per_page = searchParams.get("per_page")
      ? parseInt(searchParams.get("per_page")!, 10)
      : undefined;

    const data = await getAlbumsWithFallback({ page, per_page });

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
        "X-RateLimit-Limit": String(rateLimitResult.limit),
        "X-RateLimit-Remaining": String(rateLimitResult.remaining),
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters." },
        { status: 400 }
      );
    }

    if (error instanceof FlickrClientError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred while fetching gallery albums." },
      { status: 500 }
    );
  }
}

// Enforce GET only - 405 for all other methods
export async function POST() {
  return new NextResponse(null, { status: 405, headers: { Allow: "GET" } });
}
export async function PUT() {
  return new NextResponse(null, { status: 405, headers: { Allow: "GET" } });
}
export async function DELETE() {
  return new NextResponse(null, { status: 405, headers: { Allow: "GET" } });
}
export async function PATCH() {
  return new NextResponse(null, { status: 405, headers: { Allow: "GET" } });
}
