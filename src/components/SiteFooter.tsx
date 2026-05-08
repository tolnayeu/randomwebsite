import Link from "next/link";
import { SITE } from "@/content/site";
import { Container } from "@/components/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-16">
      <Container className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-display text-xl tracking-tight text-[var(--foreground)]">
            {SITE.name}
          </p>
          <p className="text-sm text-[var(--foreground-muted)]">{SITE.tagline}</p>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
            Cím
          </h3>
          <p className="text-sm leading-relaxed text-[var(--foreground)]">
            {SITE.address.full}
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
            Nyitvatartás
          </h3>
          <ul className="space-y-2 text-sm text-[var(--foreground)]">
            {SITE.openingHours.map((row) => (
              <li key={row.label} className="flex justify-between gap-4">
                <span className="text-[var(--foreground-muted)]">{row.label}</span>
                <span>{row.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
            Kapcsolat
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={`tel:${SITE.phoneE164}`}
                className="text-[var(--accent)] hover:underline"
              >
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="text-[var(--foreground)] hover:text-[var(--accent)]"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--accent)]"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="mt-12 border-t border-[var(--border)] pt-8">
        <div className="flex flex-col gap-4 text-xs text-[var(--foreground-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Minden jog fenntartva.
          </p>
          <nav className="flex flex-wrap gap-4" aria-label="Jogi linkek">
            <Link href="/kapcsolat" className="hover:text-[var(--foreground)]">
              Kapcsolat
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
