import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { HeroHome } from "@/components/sections/HeroHome";
import { MarketingButton } from "@/components/MarketingButton";
import { KENYER_IMAGE, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Kezdőlap",
  description: SITE.story.hero,
};

export default function HomePage() {
  return (
    <>
      <HeroHome />

      <section className="border-t border-[var(--border)] py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Történetünk"
              title={SITE.tagline}
              lead="Omszk-tó partján, fából épült vendégházunk mögött egy finomhangolt konyha működik – természet, technológia és szenvedély egyensúlyban."
            />
            <div className="space-y-6 text-base leading-relaxed text-[var(--foreground-muted)]">
              <p>{SITE.story.paragraphs[0]}</p>
              <p>{SITE.story.paragraphs[2]}</p>
              <MarketingButton href="/rolunk" variant="ghost" className="!px-0 text-[var(--accent)] hover:bg-transparent hover:text-[var(--foreground)]">
                Teljes történet →
              </MarketingButton>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-[var(--border)] py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.08),transparent_45%)]" />
        <Container className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={KENYER_IMAGE}
              alt="Házi kenyér és pékáru a Gól vendéglőből"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Kenyér"
              title="Helyben sütött kenyér"
              lead="Méltán híres, nagy gondossággal készített kenyerünk teszi teljessé az élményt – kiváló lisztből és friss forrásvízből."
            />
            <p className="mt-6 text-[var(--foreground-muted)]">
              {SITE.story.paragraphs[3]}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Nyitva vagyunk"
              title="Nyitvatartás & konyha"
              lead={SITE.kitchenHours.line}
            />
            <ul className="mt-10 space-y-4">
              {SITE.openingHours.map((row) => (
                <li
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--border)] py-3 text-sm"
                >
                  <span className="text-[var(--foreground-muted)]">{row.label}</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border border-[var(--border)] bg-[var(--background)] p-8 md:p-10">
            <h3 className="font-display text-2xl text-[var(--foreground)]">
              Foglaljon asztalt
            </h3>
            <p className="mt-3 text-sm text-[var(--foreground-muted)]">
              Hívjon minket, vagy küldjön üzenetet online – visszahívjuk a
              részletekkel.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MarketingButton href={`tel:${SITE.phoneE164}`} variant="primary">
                {SITE.phoneDisplay}
              </MarketingButton>
              <MarketingButton href="/foglalas" variant="outline">
                Online foglalás
              </MarketingButton>
            </div>
            <p className="mt-6 text-xs text-[var(--foreground-muted)]">
              E-mail:{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-[var(--accent)] hover:underline"
              >
                {SITE.email}
              </a>
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] py-24 md:py-28">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl text-[var(--foreground)] md:text-4xl">
              Készen áll a vacsora?
            </h2>
            <p className="mt-2 text-[var(--foreground-muted)]">
              Étlapunk folyamatosan újul – tekintse meg a legfrissebb fogásokat.
            </p>
          </div>
          <MarketingButton href="/etlap" variant="primary">
            Étlap
          </MarketingButton>
        </Container>
      </section>
    </>
  );
}
