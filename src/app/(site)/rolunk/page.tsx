import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Rólunk",
  description: "A Gól vendéglő története – Rejtett kincs az Omszk-tó partján.",
};

export default function AboutPage() {
  return (
    <div className="border-b border-[var(--border)] pb-24 pt-16 md:pb-32 md:pt-24">
      <Container>
        <SectionHeading
          eyebrow="A vendéglő"
          title={SITE.tagline}
          lead="A természet és a modern konyha találkozása Budakalászon."
          className="mb-16"
        />
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-[var(--foreground-muted)]">
          {SITE.story.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </div>
  );
}
