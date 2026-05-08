import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { restaurantJsonLd } from "@/lib/jsonld";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

const geistMono = Geist_Mono({subsets:['latin'],variable:'--font-mono'});

const interHeading = Inter({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gól vendéglő | Budakalász, Omszk Park",
    template: "%s | Gól vendéglő",
  },
  description:
    "A „Rejtett kincs” – rusztikus tóparti vendéglő Budakalászon, modern konyhával, helyben sütött kenyérrel. Asztalfoglalás és étlap online.",
  openGraph: {
    title: "Gól vendéglő",
    description:
      "Modern gasztronómiai műhely az Omszk-tó partján – hagyomány és nemzetközi ízek.",
    locale: "hu_HU",
    type: "website",
    url: siteUrl,
    siteName: "Gól vendéglő",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Gól vendéglő logó",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = restaurantJsonLd();

  return (
    <html
      lang="hu"
      className={cn("h-full", "scroll-smooth", "antialiased", bodoni.variable, dmSans.variable, "font-mono", inter.variable, interHeading.variable, geistMono.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
