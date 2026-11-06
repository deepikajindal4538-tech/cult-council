import { NextResponse } from "next/server";
import { getCouncilMembers } from "@/lib/adminData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const members = await getCouncilMembers();
    return NextResponse.json({ members });
  } catch (err) {
    console.error("Public council error:", err);
    return NextResponse.json({ error: "Failed to fetch council members" }, { status: 500 });
  }
}
