import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl tracking-tight text-[var(--foreground)] sm:text-4xl md:text-[2.5rem] md:leading-tight">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-base leading-relaxed text-[var(--foreground-muted)] md:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
