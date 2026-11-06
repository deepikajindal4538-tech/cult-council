import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdminPasskey,
  createAdminSessionToken,
  setAdminSessionCookie,
  checkAdminLoginRateLimit,
  recordFailedAdminLogin,
  resetAdminLoginAttempts,
} from "@/lib/flickr/adminAuth";
import { recordAuditAction } from "@/lib/flickr/killSwitch";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // 1. Rate limiting for brute-force protection
  const rateLimit = checkAdminLoginRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: `Too many failed login attempts. Terminal locked for security. Try again in ${rateLimit.retryAfter || 900} seconds.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter || 900) },
      }
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
      const remainingAttempts = rateLimit.remaining - 1;
      return NextResponse.json(
        {
          error: "Invalid admin passkey.",
          remainingAttempts: Math.max(0, remainingAttempts),
        },
        { status: 401 }
      );
    }

    // Success: reset attempts, create secure signed session token
    resetAdminLoginAttempts(ip);
    const token = createAdminSessionToken();
    recordAuditAction("ADMIN_LOGIN", "ADMIN", `Authenticated from IP: ${ip}`);

    const res = NextResponse.json(
      {
        success: true,
        message: "Terminal access granted.",
      },
      { status: 200 }
    );

    setAdminSessionCookie(res, token);
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
