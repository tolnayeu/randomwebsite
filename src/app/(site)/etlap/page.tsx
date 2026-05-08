import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ETLAP_CATEGORIES, ETLAP_SYNCED_FROM } from "@/content/etlap-products.generated";

export const metadata: Metadata = {
  title: "Étlap",
  description:
    "Étel- és italválaszték a Gól vendéglőben – Budakalász, Omszk Park.",
};

export default function MenuPage() {
  return (
    <div className="pb-24 pt-16 md:pb-32 md:pt-24">
      <Container>
        <SectionHeading
          eyebrow="Menü"
          title="Étlap"
          lead={
            <>
              Termékek és árak a{" "}
              <a
                href={ETLAP_SYNCED_FROM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                goletterem.hu webáruház
              </a>{" "}
              alapján szinkronizálva. A teljes rendeléshez látogasson el az eredeti
              oldalra.
            </>
          }
          className="mb-12 md:mb-16"
        />

        <p className="mb-12 max-w-2xl text-sm text-[var(--foreground-muted)]">
          <Link
            href="https://www.goletterem.hu/webaruhaz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            Online rendelés (webaruhaz)
          </Link>{" "}
          ·{" "}
          <a
            href="https://www.facebook.com/golvendeglo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)]"
          >
            Napi ajánlat a Facebookon
          </a>
        </p>

        <div className="flex flex-col gap-20 md:gap-24">
          {ETLAP_CATEGORIES.map((cat) => (
            <section
              key={cat.category}
              id={slugify(cat.category)}
              className="scroll-mt-28 border-t border-[var(--border)] pt-14 first:border-t-0 first:pt-0"
            >
              <h2 className="font-display text-2xl tracking-tight text-[var(--foreground)] md:text-3xl">
                {cat.category}
              </h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)]"
                  >
                    <div className="relative aspect-[4/3] bg-[var(--background)]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-[var(--foreground-muted)]"
                          aria-hidden
                        >
                          Nincs fotó
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <p className="font-medium leading-snug text-[var(--foreground)]">
                        {item.name}
                      </p>
                      <p className="mt-auto font-display text-lg text-[var(--accent)]">
                        {item.priceLabel}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-16 text-xs text-[var(--foreground-muted)]">
          Forrás:{" "}
          <a
            href={ETLAP_SYNCED_FROM}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            goletterem.hu/etlap
          </a>
          . Az árak és elérhetőség változhatnak; a weben szereplő, naprakész adat
          az eredeti oldalon található.
        </p>
      </Container>
    </div>
  );
}

function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
