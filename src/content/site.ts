/** Site copy and structured data for Gól vendéglő – aligns with goletterem.hu */

export const SITE = {
  name: "Gól vendéglő",
  tagline: "A „Rejtett kincs”",
  address: {
    postal: "Budakalász",
    line: "Omszk Park 3",
    full: "Budakalász, Omszk Park 3",
  },
  phoneDisplay: "+36 26 340 425",
  phoneE164: "+3626340425",
  email: "goletterem@gmail.com",
  facebook: "https://www.facebook.com/golvendeglo",
  /** Kitchen / order hours from current site copy */
  kitchenHours: {
    line: "Hétfőtől szombatig 11:30–21:30, vasárnap 11:30–20:30",
  },
  /** Nyitvatartás block */
  openingHours: [
    { label: "Hé–csütörtök", value: "11:00 – 22:00" },
    { label: "Péntek–szombat", value: "11:00 – 22:00" },
    { label: "Vasárnap", value: "11:00 – 21:00" },
  ],
  story: {
    hero: "Rejtett kincs az Omszk-tó partján.",
    paragraphs: [
      "A természetbe simuló, rusztikus fa épületünk ajtaja mögött egy valódi modern gasztronómiai műhely rejtőzik. Bár külsőnk a tóparti faházak egyszerű békéjét idézi, ne tévessze meg a látszat: bent csúcsminőségű technológiával és szívvel-lélekkel alkotunk.",
      "Konyhánk az Omszk-tó partján hétfőtől szombatig 11:30 és 21:30 között, vasárnap pedig 11:30-tól 20:30-ig várja vendégeit és rendeléseit.",
      "Étlapunkon a hagyomány és a modernitás találkozik: hiszünk a természetesség erejében, ezért fogásainkhoz a legjobb alapanyagokat válogatjuk. Világjáró körútjaink inspirációját is hazahozzuk, folyamatosan megújítva kedvenc nemzetközi ízeinket.",
      "Az élményt méltán híres, helyben sütött kenyerünk teszi teljessé, melyet nagy gondossággal, kiváló lisztből és friss forrásvízből készítünk vendégeinknek.",
      "Térjen be hozzánk, és hagyja, hogy az ízek magukért beszéljenek!",
    ],
  },
  nav: [
    { href: "/", label: "Kezdőlap" },
    { href: "/rolunk", label: "Rólunk" },
    { href: "/etlap", label: "Étlap" },
    { href: "/galeria", label: "Galéria" },
    { href: "/foglalas", label: "Foglalás" },
    { href: "/kapcsolat", label: "Kapcsolat" },
  ],
} as const;

/**
 * Kezdőlap hősfotó diavetítés – a felhasználó Maps (hely/galéria) linkjeiből kinyert fotók.
 * Forrás linkek (Google Maps): https://maps.app.goo.gl/Fd5S1ommymfoLisc6 stb.
 * Újrahúzáshoz: a linkekhez tartozó lh3 URL-ek a redirect Location mezőben (!6s…) találhatók.
 */
export const HERO_SLIDESHOW = [
  { src: "/images/hero-slideshow/01.jpg", alt: "Gól vendéglő – vendég fotó" },
  { src: "/images/hero-slideshow/02.jpg", alt: "Gól vendéglő – vendég fotó" },
  { src: "/images/hero-slideshow/03.jpg", alt: "Gól vendéglő – vendég fotó" },
  { src: "/images/hero-slideshow/04.jpg", alt: "Gól vendéglő – vendég fotó" },
  { src: "/images/hero-slideshow/05.jpg", alt: "Gól vendéglő – vendég fotó" },
  { src: "/images/hero-slideshow/06.jpg", alt: "Gól vendéglő – vendég fotó" },
  { src: "/images/hero-slideshow/07.jpg", alt: "Gól vendéglő – vendég fotó" },
] as const;

/**
 * Egyetlen fejléckép (OG / tartalék) – korábbi Webnode fejléc.
 * Újrahúzáshoz: `python3 scripts/fetch_original_images.py`
 */
export const HERO_IMAGE = "/images/original/hero.webp";

export const KENYER_IMAGE = "/images/original/kenyer-bagett.webp";

export const GALLERY_IMAGES = [
  {
    src: "/images/original/gal-01-libamell.jpg",
    alt: "Sült libamell asztalon tálalva",
    caption: "Libamell",
  },
  {
    src: "/images/original/gal-02-gulyas.jpg",
    alt: "Gulyás tál",
    caption: "Gulyás",
  },
  {
    src: "/images/original/gal-03-lazac.jpg",
    alt: "Lazac saláta",
    caption: "Lazac saláta",
  },
  {
    src: "/images/original/gal-04-terasz.jpg",
    alt: "A vendéglő enteriőrje, tóparti hangulat",
    caption: "Enteriőr",
  },
  {
    src: "/images/original/gal-05-talalas.jpg",
    alt: "Megterített asztal, fogások a Gól vendéglőben",
    caption: "Asztal",
  },
  {
    src: "/images/original/gal-06-ebed.jpg",
    alt: "Ebéd fogás tálalva",
    caption: "Ebéd",
  },
] as const;
