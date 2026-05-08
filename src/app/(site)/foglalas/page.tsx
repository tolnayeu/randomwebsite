import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ReservationForm } from "@/components/ReservationForm";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Asztalfoglalás",
  description:
    "Foglaljon asztalt a Gól vendéglőbe Budakalászon – online űrlap vagy telefon.",
};

export default function ReservationPage() {
  return (
    <div className="pb-24 pt-16 md:pb-32 md:pt-24">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Foglalás"
          title="Asztalfoglalás"
          lead="Töltse ki az űrlapot – csapatunk visszaigazolja a szabad időpontokat. Telefonon is foglalhat."
          className="mb-12"
        />
        <div className="mb-10 flex flex-wrap gap-4 text-sm">
          <a
            href={`tel:${SITE.phoneE164}`}
            className="rounded-full border border-[var(--border)] px-5 py-2 text-[var(--foreground)] hover:border-[var(--accent)]"
          >
            {SITE.phoneDisplay}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="rounded-full border border-[var(--border)] px-5 py-2 text-[var(--foreground)] hover:border-[var(--accent)]"
          >
            {SITE.email}
          </a>
        </div>
        <ReservationForm />
      </Container>
    </div>
  );
}
