import { NextResponse } from "next/server";
import { getTimelineEvents } from "@/lib/adminData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await getTimelineEvents();
    return NextResponse.json({ events });
  } catch (err) {
    console.error("Public events error:", err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
