import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/flickr/adminAuth";
import { getFlickrControlState, clearAuditLog } from "@/lib/flickr/killSwitch";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export async function GET(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const state = getFlickrControlState();
  const logs = state.auditLog || [];
  const currentIp = getClientIp(req);

  // IP Analytics
  const uniqueIps = Array.from(new Set(logs.map((l) => l.ip || "127.0.0.1")));
  const failedEvents = logs.filter((l) => l.status === "FAILED" || l.action.includes("FAILED"));
  const securityWarnings = logs.filter((l) => l.status === "WARNING" || l.action.includes("ENGAGED"));

  return NextResponse.json(
    {
      logs,
      currentIp,
      stats: {
        totalEvents: logs.length,
        uniqueIpsCount: uniqueIps.length,
        uniqueIps,
        failedCount: failedEvents.length,
        warningCount: securityWarnings.length,
        lastEventTime: logs[0]?.timestamp || null,
      },
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store, max-age=0" },
    }
  );
}

export async function DELETE(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const ip = getClientIp(req);
  const updatedState = clearAuditLog("ADMIN", ip);

  return NextResponse.json(
    {
      success: true,
      message: "Audit ledger cleared successfully.",
      logs: updatedState.auditLog,
    },
    { status: 200 }
  );
}
