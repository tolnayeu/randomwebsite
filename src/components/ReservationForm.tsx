"use client";

import { useState } from "react";
import { SITE } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

const initial = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  guests: "2",
  message: "",
};

export function ReservationForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    trackEvent("reservation_submit_attempt");

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Ismeretlen hiba");
      }

      setStatus("success");
      setForm(initial);
      trackEvent("reservation_submit_success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Küldés sikertelen. Próbálja újra.",
      );
      trackEvent("reservation_submit_error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-[var(--foreground-muted)]">Név *</span>
          <input
            required
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-[var(--foreground-muted)]">Telefon *</span>
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={SITE.phoneDisplay}
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm">
        <span className="text-[var(--foreground-muted)]">E-mail</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm sm:col-span-1">
          <span className="text-[var(--foreground-muted)]">Dátum *</span>
          <input
            required
            name="date"
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-[var(--foreground-muted)]">Időpont</span>
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            className="rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="text-[var(--foreground-muted)]">Vendégek *</span>
          <select
            required
            name="guests"
            value={form.guests}
            onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
            className="rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
          >
            {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
              <option key={n} value={String(n)}>
                {n} fő
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm">
        <span className="text-[var(--foreground-muted)]">Megjegyzés</span>
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Esetleges ételallergia, ünnep, elérhetőség…"
          className="resize-y rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
        />
      </label>

      <p className="text-xs text-[var(--foreground-muted)]">
        A foglalás nem automatikus visszaigazolás: kollégáink hamarosan felveszik
        Önnel a kapcsolatot. Sürgős esetben hívjon:{" "}
        <a href={`tel:${SITE.phoneE164}`} className="text-[var(--accent)]">
          {SITE.phoneDisplay}
        </a>
        .
      </p>

      {status === "success" ? (
        <p
          className="rounded-md border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-200"
          role="status"
        >
          Köszönjük! Üzenetét megkaptuk – hamarosan jelentkezünk.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="rounded-md border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? "Küldés…" : "Foglalás elküldése"}
      </Button>
    </form>
  );
}
