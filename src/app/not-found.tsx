import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl text-[var(--foreground)]">
          Az oldal nem található
        </h1>
        <p className="mt-4 text-[var(--foreground-muted)]">
          Ellenőrizze a címet, vagy térjen vissza a kezdőlapra.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-medium text-[var(--background)] transition hover:brightness-110"
        >
          Kezdőlap
        </Link>
      </Container>
    </div>
  );
}
