import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { GALLERY_IMAGES } from "@/content/site";

export const metadata: Metadata = {
  title: "Galéria",
  description: "Hangulatképek – ízek, enteriőr és részletek a Gól vendéglőből.",
};

export default function GalleryPage() {
  return (
    <div className="pb-24 pt-16 md:pb-32 md:pt-24">
      <Container>
        <SectionHeading
          eyebrow="Fotók"
          title="Galéria"
          lead="Fotók a goletterem.hu galériájából – ételek, hangulat és enteriőr."
          className="mb-16"
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((img) => (
            <li key={img.src}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-4 text-sm text-white">
                  {img.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
