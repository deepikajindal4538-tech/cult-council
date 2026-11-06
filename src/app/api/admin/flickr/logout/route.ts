import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/flickr/adminAuth";

export async function POST() {
  const res = NextResponse.json(
    { success: true, message: "Logged out successfully." },
    { status: 200 }
  );
  clearAdminSessionCookie(res);
  return res;
}
