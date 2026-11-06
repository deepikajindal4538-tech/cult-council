import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/flickr/adminAuth";
import { testFlickrConnection } from "@/lib/flickr/client";
import { recordAuditAction } from "@/lib/flickr/killSwitch";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || "Browser Client";
  const result = await testFlickrConnection();
  recordAuditAction(
    "TEST_PING",
    "ADMIN_USER",
    `Ping result: ${result.success ? "SUCCESS" : "FAILED"}. Latency: ${result.latencyMs || 0}ms. ${result.message}`,
    ip,
    userAgent,
    result.success ? "SUCCESS" : "FAILED"
  );

  return NextResponse.json(result, { status: 200 });
}
