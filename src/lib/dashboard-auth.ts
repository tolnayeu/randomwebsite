import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "dashboard_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 7;

function secret() {
  return (
    process.env.DASHBOARD_SESSION_SECRET ??
    "dev-dashboard-session-secret-change-me"
  );
}

function credentials() {
  return {
    user: process.env.DASHBOARD_USER ?? "user",
    pass: process.env.DASHBOARD_PASSWORD ?? "user",
  };
}

function safeStrEqual(a: string, b: string) {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) {
    return false;
  }
  return timingSafeEqual(ba, bb);
}

export function verifyDashboardLogin(username: string, password: string) {
  const { user, pass } = credentials();
  return safeStrEqual(username, user) && safeStrEqual(password, pass);
}

function signPayload(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export async function setDashboardSessionCookie() {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payload = Buffer.from(
    JSON.stringify({ v: 1, exp }),
    "utf8",
  ).toString("base64url");
  const sig = signPayload(payload);
  const value = `${payload}.${sig}`;
  (await cookies()).set(COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export async function clearDashboardSessionCookie() {
  (await cookies()).delete(COOKIE);
}

export async function verifyDashboardSession(): Promise<boolean> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw || !raw.includes(".")) return false;
  const [payload, sig] = raw.split(".");
  if (!payload || !sig) return false;
  const expected = signPayload(payload);
  const sigBuf = Buffer.from(sig, "base64url");
  const expBuf = Buffer.from(expected, "base64url");
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return false;
  }
  try {
    const json = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { exp?: number };
    if (typeof json.exp !== "number" || Date.now() > json.exp) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
