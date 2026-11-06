import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/flickr/adminAuth";
import { testFlickrConnection } from "@/lib/flickr/client";
import { recordAuditAction } from "@/lib/flickr/killSwitch";

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const result = await testFlickrConnection();
  recordAuditAction(
    "TEST_PING",
    "ADMIN_USER",
    `Ping result: ${result.success ? "SUCCESS" : "FAILED"}. Latency: ${result.latencyMs || 0}ms. ${result.message}`
  );

  return NextResponse.json(result, { status: 200 });
}
