"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/content/site";
import { cn } from "@/lib/cn";
import { MarketingButton } from "@/components/MarketingButton";
import { Container } from "@/components/Container";
import { trackEvent } from "@/lib/analytics";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-black/50 to-transparent",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="relative flex shrink-0 items-center"
          onClick={() => {
            trackEvent("logo_click");
            setOpen(false);
          }}
        >
          <Image
            src="/logo.png"
            alt={`${SITE.name} logó`}
            width={280}
            height={72}
            className="h-9 w-auto md:h-11"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-8 text-sm font-medium text-[var(--foreground-muted)] md:flex"
          aria-label="Fő navigáció"
        >
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <MarketingButton
            href="/foglalas"
            onClick={() => trackEvent("cta_foglalas_header")}
          >
            Asztalfoglalás
          </MarketingButton>
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menü</span>
          <span
            className={cn(
              "absolute h-0.5 w-5 bg-current transition-all duration-200",
              open ? "translate-y-0 rotate-45" : "-translate-y-2",
            )}
          />
          <span
            className={cn(
              "absolute h-0.5 w-5 bg-current transition-opacity duration-200",
              open ? "opacity-0" : "opacity-100",
            )}
          />
          <span
            className={cn(
              "absolute h-0.5 w-5 bg-current transition-all duration-200",
              open ? "translate-y-0 -rotate-45" : "translate-y-2",
            )}
          />
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-[var(--border)] bg-[var(--background)] px-5 py-8 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-4 text-lg" aria-label="Mobil menü">
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-[var(--border)] pb-4"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <MarketingButton
            href="/foglalas"
            className="mt-4 w-full"
            onClick={() => {
              trackEvent("cta_foglalas_mobile");
              setOpen(false);
            }}
          >
            Asztalfoglalás
          </MarketingButton>
        </nav>
      </div>
    </header>
  );
}
