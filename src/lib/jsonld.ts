import { SITE } from "@/content/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.goletterem.hu";

export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE.name,
    description: SITE.story.hero,
    telephone: SITE.phoneE164,
    email: SITE.email,
    url: siteUrl,
    image: `${siteUrl}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line,
      addressLocality: SITE.address.postal,
      addressCountry: "HU",
    },
    servesCuisine: "Magyar, nemzetközi",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "11:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "11:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "21:00",
      },
    ],
    sameAs: [SITE.facebook],
  };
}
