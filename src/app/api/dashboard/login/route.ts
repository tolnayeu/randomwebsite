import { NextResponse } from "next/server";
import {
  setDashboardSessionCookie,
  verifyDashboardLogin,
} from "@/lib/dashboard-auth";

export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = (await request.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const username = body.username?.trim() ?? "";
  const password = body.password ?? "";
  if (!verifyDashboardLogin(username, password)) {
    return NextResponse.json(
      { ok: false, error: "Hibás belépési adatok." },
      { status: 401 },
    );
  }
  await setDashboardSessionCookie();
  return NextResponse.json({ ok: true });
}
