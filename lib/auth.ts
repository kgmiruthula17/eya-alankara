/**
 * Admin authentication helpers
 * Simple token-based auth using HMAC-SHA256 signing
 */

import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_token";
const TOKEN_MAX_AGE = 60 * 60 * 24; // 24 hours

function getSecret(): string {
  return process.env.ADMIN_SECRET || "fallback_dev_secret";
}

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin";
}

/**
 * Creates a signed token containing a timestamp
 */
export function createToken(): string {
  const payload = JSON.stringify({ ts: Date.now(), role: "admin" });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(encoded)
    .digest("base64url");
  return `${encoded}.${signature}`;
}

/**
 * Verifies a signed token
 */
export function verifyToken(token: string): boolean {
  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return false;

    const expectedSig = crypto
      .createHmac("sha256", getSecret())
      .update(encoded)
      .digest("base64url");

    if (signature !== expectedSig) return false;

    // Check expiry
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    const age = (Date.now() - payload.ts) / 1000;
    return age < TOKEN_MAX_AGE;
  } catch {
    return false;
  }
}

/**
 * Validates the admin password
 */
export function validatePassword(password: string): boolean {
  return password === getPassword();
}

/**
 * Checks if the current request has a valid admin cookie.
 * Use in API route handlers to protect endpoints.
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export { COOKIE_NAME, TOKEN_MAX_AGE };
