import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdminPasskey,
  createAdminSessionToken,
  setAdminSessionCookie,
  checkAdminLoginRateLimit,
  recordFailedAdminLogin,
  resetAdminLoginAttempts,
} from "@/lib/adminAuth";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // Rate limiting check
  const rateLimit = checkAdminLoginRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: `Too many failed attempts. Terminal locked for security. Try again in ${rateLimit.retryAfter || 900} seconds.`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { passkey } = body;

    if (!passkey || typeof passkey !== "string") {
      recordFailedAdminLogin(ip);
      return NextResponse.json({ error: "Passkey is required." }, { status: 400 });
    }

    const isValid = verifyAdminPasskey(passkey);
    if (!isValid) {
      recordFailedAdminLogin(ip);
      return NextResponse.json(
        { error: "Invalid administrative passkey. Access denied." },
        { status: 401 }
      );
    }

    // Success
    resetAdminLoginAttempts(ip);
    const token = createAdminSessionToken();

    const response = NextResponse.json({
      success: true,
      message: "Administrative clearance verified. Terminal unlocked.",
    });

    setAdminSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Server authentication error." },
      { status: 500 }
    );
  }
}
