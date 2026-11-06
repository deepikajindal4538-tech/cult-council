import "server-only";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "iiita_cc_flickr_admin";
const TOKEN_MAX_AGE_SECONDS = 8 * 60 * 60; // 8 hours

/**
 * Resolves the admin passkey from environment or uses a fallback in development.
 */
export function getAdminPasskey(): string {
  return process.env.FLICKR_ADMIN_PASSKEY || "iiita-cultural-council-2026";
}

/**
 * Generates or resolves the secret used to sign admin session tokens.
 */
function getSigningSecret(): string {
  const base = process.env.SESSION_SECRET || process.env.FLICKR_ADMIN_PASSKEY || "iiita-cc-flickr-secret-key-salt";
  return crypto.createHash("sha256").update(base).digest("hex");
}

/**
 * Timing-safe passkey verification to prevent side-channel timing attacks.
 */
export function verifyAdminPasskey(providedPasskey: string): boolean {
  if (!providedPasskey || typeof providedPasskey !== "string") {
    return false;
  }

  const expectedPasskey = getAdminPasskey();

  // Hash both with sha256 to guarantee identical buffer lengths before timingSafeEqual
  const providedHash = crypto.createHash("sha256").update(providedPasskey.trim()).digest();
  const expectedHash = crypto.createHash("sha256").update(expectedPasskey.trim()).digest();

  return crypto.timingSafeEqual(providedHash, expectedHash);
}

/**
 * Creates a cryptographically signed session token.
 * Format: {timestamp}.{nonce}.{signature}
 */
export function createAdminSessionToken(): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${timestamp}.${nonce}`;
  
  const signature = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

/**
 * Validates the HMAC signature and timestamp expiry of an admin session token.
 */
export function verifyAdminSessionToken(token: string): boolean {
  if (!token || typeof token !== "string") {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [timestampStr, nonce, providedSignature] = parts;
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp)) {
    return false;
  }

  // Check expiration (8 hours)
  const now = Math.floor(Date.now() / 1000);
  if (now - timestamp > TOKEN_MAX_AGE_SECONDS || timestamp > now + 60) {
    return false;
  }

  const payload = `${timestampStr}.${nonce}`;
  const expectedSignature = crypto
    .createHmac("sha256", getSigningSecret())
    .update(payload)
    .digest("hex");

  const providedBuf = Buffer.from(providedSignature, "hex");
  const expectedBuf = Buffer.from(expectedSignature, "hex");

  if (providedBuf.length !== expectedBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(providedBuf, expectedBuf);
}

/**
 * Checks if incoming NextRequest has a valid admin session cookie.
 */
export function isAdminAuthenticated(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME);
  if (!cookie || !cookie.value) {
    return false;
  }
  return verifyAdminSessionToken(cookie.value);
}

/**
 * Attaches secure, HttpOnly admin cookie to response.
 */
export function setAdminSessionCookie(res: NextResponse, token: string): void {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: TOKEN_MAX_AGE_SECONDS,
  });
}

/**
 * Clears the admin session cookie on logout.
 */
export function clearAdminSessionCookie(res: NextResponse): void {
  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

/**
 * Dedicated in-memory brute-force rate limiter for admin login attempts.
 * Max 5 failed attempts within 15 minutes before temporary IP lockout.
 */
interface LoginAttemptRecord {
  count: number;
  firstAttempt: number;
  lockedUntil: number | null;
}

const loginAttempts = new Map<string, LoginAttemptRecord>();

export function checkAdminLoginRateLimit(ip: string): { allowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  const record = loginAttempts.get(ip);

  if (record && record.lockedUntil && record.lockedUntil > now) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((record.lockedUntil - now) / 1000),
    };
  }

  if (!record || now - record.firstAttempt > windowMs) {
    return { allowed: true, remaining: maxAttempts };
  }

  if (record.count >= maxAttempts) {
    record.lockedUntil = now + windowMs;
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil(windowMs / 1000),
    };
  }

  return { allowed: true, remaining: maxAttempts - record.count };
}

export function recordFailedAdminLogin(ip: string): void {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const record = loginAttempts.get(ip);

  if (!record || now - record.firstAttempt > windowMs) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now, lockedUntil: null });
  } else {
    record.count += 1;
    if (record.count >= 5) {
      record.lockedUntil = now + windowMs;
    }
  }
}

export function resetAdminLoginAttempts(ip: string): void {
  loginAttempts.delete(ip);
}
