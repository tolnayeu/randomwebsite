import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description:
    "Gól vendéglő – cím, nyitvatartás, telefon és e-mail Budakalász, Omszk Park.",
};

export default function ContactPage() {
  return (
    <div className="pb-24 pt-16 md:pb-32 md:pt-24">
      <Container>
        <SectionHeading
          eyebrow="Elérhetőség"
          title="Kapcsolat"
          lead="Látogasson el hozzánk az Omszk-tó partjára – várjuk szeretettel."
          className="mb-12 max-w-2xl"
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8 rounded-sm border border-[var(--border)] bg-[var(--surface)] p-8">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                Cím
              </h2>
              <p className="mt-3 text-lg text-[var(--foreground)]">
                {SITE.address.full}
              </p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                Telefon
              </h2>
              <a
                href={`tel:${SITE.phoneE164}`}
                className="mt-3 block text-xl text-[var(--accent)] hover:underline"
              >
                {SITE.phoneDisplay}
              </a>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                E-mail
              </h2>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-3 block text-[var(--foreground)] hover:text-[var(--accent)]"
              >
                {SITE.email}
              </a>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                Közösségi média
              </h2>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[var(--foreground)] hover:text-[var(--accent)]"
              >
                Facebook
              </a>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
                Nyitvatartás
              </h2>
              <ul className="mt-4 space-y-3 text-[var(--foreground)]">
                {SITE.openingHours.map((row) => (
                  <li key={row.label} className="flex justify-between gap-4">
                    <span className="text-[var(--foreground-muted)]">
                      {row.label}
                    </span>
                    {row.value}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[var(--foreground-muted)]">
                Konyha: {SITE.kitchenHours.line}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 rounded-sm border border-[var(--border)] bg-[var(--background)] p-6 md:p-8">
            <div>
              <h2 className="font-display text-2xl text-[var(--foreground)]">
                Térkép
              </h2>
              <p className="mt-3 text-sm text-[var(--foreground-muted)]">
                Gól vendéglő – Budakalász, Omszk Park. Nagyításért és útvonalhoz
                nyissa meg a Google Térképen.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[4/3] w-full min-h-[280px] md:aspect-video md:min-h-[360px]">
                <iframe
                  title="Gól vendéglő – Google Térkép"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10759.94838171262!2d19.0506164!3d47.6069406!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741d77275694f91%3A0x30808aa9333e016c!2zR8OzbCBWZW5kw6lnbMWR!5e0!3m2!1shu!2shu!4v1778262765364!5m2!1shu!2shu"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <a
                href="https://www.google.com/maps/search/?api=1&query=G%C3%B3l+Vend%C3%A9gl%C5%91+Budakal%C3%A1sz+Omszk+Park"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--background)]"
              >
                Útvonal a Google Térképen
              </a>
              <p className="text-sm text-[var(--foreground-muted)]">
                Gyors foglalás:{" "}
                <Link href="/foglalas" className="text-[var(--accent)] hover:underline">
                  Online űrlap
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
