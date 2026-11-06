import { NextRequest, NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Admin terminal locked and session cleared.",
  });
  clearAdminSessionCookie(response);
  return response;
}
