#!/usr/bin/env python3
"""
Fetch all products from goletterem.hu/etlap/ (paginated), download product images,
and write src/content/etlap-products.generated.ts

Requires Referer header for CDN downloads (403 otherwise).
"""

from __future__ import annotations

import html as hlib
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from pathlib import Path

BASE = "https://www.goletterem.hu"
ETLAP_PATH = "/etlap/"
OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "images" / "etlap"
TS_OUT = Path(__file__).resolve().parents[1] / "src" / "content" / "etlap-products.generated.ts"

HEADERS_FETCH = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Referer": "https://www.goletterem.hu/",
    "Accept": "text/html,application/xhtml+xml",
}
HEADERS_IMG = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Referer": "https://www.goletterem.hu/",
    "Accept": "image/avif,image/webp,image/*,*/*;q=0.8",
}


def fetch_html(path: str) -> str:
    url = BASE + path if path.startswith("/") else path
    req = urllib.request.Request(url, headers=HEADERS_FETCH)
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read().decode("utf-8", errors="ignore")


def parse_products(html: str) -> list[dict]:
    items: list[dict] = []
    for p in html.split('data-wnd_product_item_data="')[1:]:
        depth = 0
        started = False
        for j, c in enumerate(p):
            if c == "{":
                depth += 1
                started = True
            elif c == "}":
                depth -= 1
            if started and depth == 0:
                blob = hlib.unescape(p[: j + 1].replace("&quot;", '"'))
                try:
                    items.append(json.loads(blob))
                except json.JSONDecodeError:
                    pass
                break
    return items


def next_page_path(html: str) -> str | None:
    m = re.search(
        r'<a class="pager-next([^"]*)" href="([^"]*)"',
        html,
    )
    if not m:
        return None
    classes, href = m.group(1), m.group(2)
    if "wnd-disabled" in classes:
        return None
    if not href or href.startswith("#"):
        return None
    if href.startswith("http"):
        p = urllib.parse.urlparse(href)
        return p.path or None
    return href


def pick_image_url(images: list[str] | None) -> str | None:
    if not images:
        return None
    for u in images:
        if not u or not str(u).strip():
            continue
        u = str(u).strip()
        if "/450/" in u:
            return u.replace("/450/", "/700/")
        if "/700/" in u:
            return u
        # .../hash/filename.ext -> .../hash/700/filename.ext
        m = re.match(
            r"(https://[^/]+/[^/]+/\d+-[a-f0-9]+/)([^/]+\.(?:jpg|jpeg|png|webp|JPG|PNG|WEBP))",
            u,
            re.I,
        )
        if m and "/700/" not in u:
            return m.group(1) + "700/" + m.group(2)
        return u
    return None


def ext_from_url(url: str) -> str:
    path = urllib.parse.urlparse(url).path
    if "." in path:
        return path.rsplit(".", 1)[-1].lower()
    return "jpg"


def download_image(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers=HEADERS_IMG)
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            dest.write_bytes(r.read())
        return True
    except urllib.error.HTTPError as e:
        print(f"  SKIP download {e.code} {url[:80]}...", file=sys.stderr)
        return False


def price_label(price: str | float) -> str:
    if isinstance(price, (int, float)):
        n = int(round(price))
    else:
        n = int(round(float(price)))
    s = f"{n:,}".replace(",", " ")
    return f"{s} Ft"


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    seen_paths: set[str] = set()
    path: str | None = ETLAP_PATH
    all_rows: list[dict] = []

    while path and path not in seen_paths:
        seen_paths.add(path)
        print(f"Page {path}", file=sys.stderr)
        html = fetch_html(path)
        all_rows.extend(parse_products(html))
        path = next_page_path(html)

    by_id: dict[int, dict] = {}
    id_order: list[int] = []
    for row in all_rows:
        rid = row["id"]
        if rid not in by_id:
            id_order.append(rid)
        by_id[rid] = row
    products = [by_id[i] for i in id_order]

    cat_order: list[str] = []
    for p in products:
        c = (p.get("category") or "Egyéb").strip()
        if c not in cat_order:
            cat_order.append(c)

    grouped: dict[str, list[dict]] = defaultdict(list)
    for p in products:
        cat = (p.get("category") or "Egyéb").strip()
        grouped[cat].append(p)

    for cat in grouped:
        grouped[cat].sort(key=lambda r: (r.get("list_position") is None, r.get("list_position") or 0))

    print(f"Unique products: {len(products)}", file=sys.stderr)

    ts_categories: list[dict] = []

    for cat in cat_order:
        cat_items: list[dict] = []
        for p in grouped[cat]:
            pid = p["id"]
            name = (p.get("name") or "").strip()
            price = price_label(p.get("price") or "0")
            img_url = pick_image_url(p.get("image"))
            local: str | None = None
            if img_url:
                ext = ext_from_url(img_url)
                safe_ext = ext if ext in ("jpg", "jpeg", "png", "webp") else "jpg"
                fname = f"{pid}.{safe_ext}"
                dest = OUT_DIR / fname
                if download_image(img_url, dest):
                    local = f"/images/etlap/{fname}"
            cat_items.append(
                {
                    "id": pid,
                    "name": name,
                    "priceLabel": price,
                    "image": local,
                }
            )
        ts_categories.append({"category": cat, "items": cat_items})

    block = json.dumps(ts_categories, ensure_ascii=False, indent=2)
    out = "\n".join(
        [
            "/** AUTO-GENERATED by scripts/sync_etlap_products.py — do not edit by hand. */",
            "",
            "export type EtlapProduct = {",
            "  id: number;",
            "  name: string;",
            "  priceLabel: string;",
            "  /** local path under /public or null if no photo */",
            "  image: string | null;",
            "};",
            "",
            "export type EtlapCategory = {",
            "  category: string;",
            "  items: EtlapProduct[];",
            "};",
            "",
            (
                "export const ETLAP_SYNCED_FROM = "
                + json.dumps("https://www.goletterem.hu/etlap/", ensure_ascii=False)
                + " as const;",
                "",
                "export const ETLAP_CATEGORIES: EtlapCategory[] = " + block + ";",
                "",
            )
        ]
    )
    TS_OUT.write_text(out, encoding="utf-8")
    print(f"Wrote {TS_OUT} and images under {OUT_DIR}", file=sys.stderr)


if __name__ == "__main__":
    main()
