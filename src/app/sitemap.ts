import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const base = getSiteUrl();

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
