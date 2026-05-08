"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 3000;
const FADE_DURATION_MS = 800;

type Slide = { src: string; alt: string };

export function HeroSlideshowBackground({
  slides,
}: {
  slides: readonly Slide[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="absolute inset-0" aria-hidden>
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity ease-in-out ${
            i === index ? "z-[1]" : "z-0"
          }`}
          style={{
            opacity: i === index ? 1 : 0,
            transitionDuration: `${FADE_DURATION_MS}ms`,
          }}
        />
      ))}
    </div>
  );
}
