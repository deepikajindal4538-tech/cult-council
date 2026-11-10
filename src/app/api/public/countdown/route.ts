import { NextResponse } from "next/server";
import { getCountdownConfig } from "@/lib/adminData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = await getCountdownConfig();
    return NextResponse.json({ config });
  } catch (err) {
    console.error("Public countdown error:", err);
    return NextResponse.json({ error: "Failed to fetch countdown" }, { status: 500 });
  }
}
