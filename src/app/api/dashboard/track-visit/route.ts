import { NextResponse } from "next/server";
import { recordPageVisit } from "@/lib/dashboard-store";

export async function POST(request: Request) {
  let body: { path?: string };
  try {
    body = (await request.json()) as { path?: string };
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const path = body.path?.trim() ?? "/";
  if (!path.startsWith("/")) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  await recordPageVisit(path);
  return NextResponse.json({ ok: true });
}
