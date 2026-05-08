/**
 * Canonical site URL for metadata, JSON-LD, sitemap, robots.
 * On Vercel, `VERCEL_URL` is set automatically when `NEXT_PUBLIC_SITE_URL` is omitted.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//i, "");
    return `https://${host}`;
  }
  return "https://www.goletterem.hu";
}
