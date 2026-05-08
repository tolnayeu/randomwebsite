import { NextResponse } from "next/server";
import { appendSubmission, type ReservationSubmission } from "@/lib/dashboard-store";

type Body = {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  time?: string;
  guests?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Érvénytelen kérés." }, { status: 400 });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const date = body.date?.trim();

  if (!name || !phone || !date) {
    return NextResponse.json(
      { ok: false, error: "A név, telefon és dátum megadása kötelező." },
      { status: 400 },
    );
  }

  const payload: ReservationSubmission = {
    name,
    phone,
    email: body.email?.trim() ?? "",
    date,
    time: body.time?.trim() ?? "",
    guests: body.guests?.trim() ?? "",
    message: body.message?.trim() ?? "",
    receivedAt: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "development") {
    console.info("[reservation]", payload);
  }

  try {
    await appendSubmission(payload);
  } catch {
    return NextResponse.json(
      { ok: false, error: "A foglalás mentése most nem sikerült." },
      { status: 500 },
    );
  }

  const webhook = process.env.RESERVATION_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      return NextResponse.json(
        { ok: false, error: "A küldés most nem sikerült. Próbálja később." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
