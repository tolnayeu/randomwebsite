# Gól vendéglő – weboldal

Next.js alapú, [Forken](https://webflow.com/templates/html/forken-website-template)-szerű prémium megjelenés, a [goletterem.hu](https://www.goletterem.hu) tartalmával és a megadott logóval.

## Fejlesztés

```bash
npm install --cache ./.npm-cache   # ha az npm cache hibázna jogosultság miatt
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Környezet

Másolja [.env.example](.env.example) → `.env.local`:

- `NEXT_PUBLIC_SITE_URL` – kanonikus URL (meta + JSON-LD)
- `RESERVATION_WEBHOOK_URL` – opcionális webhook a foglalási űrlaphoz

Az űrlap fejlesztői módban a konzolra is logol.

## Oldalak

| Útvonal      | Tartalom        |
|-------------|-----------------|
| `/`         | Kezdőlap        |
| `/rolunk`   | Történet         |
| `/etlap`    | Étlap (sablon)   |
| `/galeria`  | Galéria          |
| `/foglalas` | Asztalfoglalás   |
| `/kapcsolat`| Kapcsolat       |

Logó: `public/logo.png`

## Képek (eredeti weboldal)

A hősi kép, a kenyér-/bagett fotó és a galéria a **goletterem.hu** Webnode CDN-jéről letöltött másolat (`public/images/original/`). Újrahúzás:

```bash
python3 scripts/fetch_original_images.py
```

A CDN engedélyköteles: a szkript `Referer: https://www.goletterem.hu/` fejlécet küld.

## Étlap (termékek + fotók)

A teljes étlap (115 tétel, kategóriák, árak, termékfotók) a **[goletterem.hu/etlap/](https://www.goletterem.hu/etlap/)** lapok paginált feltárásával készül; képek: `public/images/etlap/{id}.jpg`.

```bash
python3 scripts/sync_etlap_products.py
```

Ez újragenerálja a `src/content/etlap-products.generated.ts` fájlt is.
