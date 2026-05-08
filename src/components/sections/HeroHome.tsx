import { HERO_SLIDESHOW, SITE } from "@/content/site";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { HeroSlideshowBackground } from "@/components/sections/HeroSlideshowBackground";

export function HeroHome() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <HeroSlideshowBackground slides={HERO_SLIDESHOW} />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[var(--background)] via-black/70 to-black/40" />
      <Container className="relative z-[3] flex min-h-[88vh] flex-col justify-end pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            {SITE.address.postal} · {SITE.address.line}
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.05]">
            {SITE.story.hero}
          </h1>
          <p className="max-w-xl text-lg text-zinc-200 md:text-xl">
            Rusztikus tóparti hangulat, modern konyha – helyben sült kenyérrel és
            tiszta alapanyagokkal.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/foglalas" variant="primary">
              Asztalfoglalás
            </Button>
            <Button
              href="/etlap"
              variant="outline"
              className="border-white/30 text-white hover:border-[var(--accent)]"
            >
              Étlap megtekintése
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
