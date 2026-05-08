import { NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/dashboard-store";

export async function POST(request: Request) {
  let body: { name?: string; params?: Record<string, string> };
  try {
    body = (await request.json()) as {
      name?: string;
      params?: Record<string, string>;
    };
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const name = body.name?.trim();
  if (!name || name.length > 120) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  await recordAnalyticsEvent(name, body.params);
  return NextResponse.json({ ok: true });
}
