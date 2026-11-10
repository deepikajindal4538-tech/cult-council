import { NextRequest, NextResponse } from "next/server";
import { getPhotostreamWithFallback } from "@/lib/flickr/client";
import { rateLimiter } from "@/lib/rateLimit";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export async function GET(req: NextRequest) {
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
        },
      }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
    const per_page = searchParams.get("per_page")
      ? parseInt(searchParams.get("per_page")!, 10)
      : 36;
    const text = searchParams.get("text") || undefined;

    const data = await getPhotostreamWithFallback({ page, per_page, text });

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=120",
        "X-RateLimit-Limit": String(rateLimitResult.limit),
        "X-RateLimit-Remaining": String(rateLimitResult.remaining),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not load photostream." },
      { status: 500 }
    );
  }
}
