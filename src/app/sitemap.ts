import type { MetadataRoute } from "next";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.goletterem.hu";

const paths = [
  "",
  "/rolunk",
  "/etlap",
  "/galeria",
  "/foglalas",
  "/kapcsolat",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified,
  }));
}
