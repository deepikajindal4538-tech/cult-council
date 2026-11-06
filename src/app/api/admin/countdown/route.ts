import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getCountdownConfig, updateCountdownConfig } from "@/lib/adminData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const config = await getCountdownConfig();
  return NextResponse.json({ config });
}

export async function PUT(req: NextRequest) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updateCountdownConfig(body);
    return NextResponse.json({ success: true, config: updated });
  } catch (err) {
    console.error("Error updating countdown config:", err);
    return NextResponse.json({ error: "Failed to update countdown" }, { status: 500 });
  }
}
