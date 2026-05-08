#!/usr/bin/env python3
"""Download select images from goletterem.hu CDN into public/images/original/."""

from __future__ import annotations

import html as html_lib
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "original"
OUT.mkdir(parents=True, exist_ok=True)

# Explicit high-value assets (700px CDN variants — good balance of quality/size)
DOWNLOADS: list[tuple[str, str]] = [
    # Homepage hero (Webnode header / WM image)
    (
        "hero.webp",
        "https://d63f6b7d08.clvaw-cdnwnd.com/1620f4267c88d779d678491c6932edeb/200000459-b6369b636b/700/57690951_1f097ca4dfc9b2a2a20302b6ca7d482c_wm.webp?ph=d63f6b7d08",
    ),
    # Kenyér / pékség (bagett from galéria)
    (
        "kenyer-bagett.webp",
        "https://d63f6b7d08.clvaw-cdnwnd.com/1620f4267c88d779d678491c6932edeb/200000213-1709b1709e/700/bagett%201.jpg.webp?ph=d63f6b7d08",
    ),
]

# Galéria grid — distinct étel / enteriőr képek (JPEG 700)
GALLERY: list[tuple[str, str, str]] = [
    ("Libamell", "gal-01-libamell.jpg", "https://d63f6b7d08.clvaw-cdnwnd.com/1620f4267c88d779d678491c6932edeb/200000142-955d5955d8/700/Libamell.jpg?ph=d63f6b7d08"),
    ("Gulyás", "gal-02-gulyas.jpg", "https://d63f6b7d08.clvaw-cdnwnd.com/1620f4267c88d779d678491c6932edeb/200000138-b0fa0b0fa2/700/Guly%C3%A1s.jpg?ph=d63f6b7d08"),
    ("Lazac saláta", "gal-03-lazac.jpg", "https://d63f6b7d08.clvaw-cdnwnd.com/1620f4267c88d779d678491c6932edeb/200000141-7085b7085d/700/Lazac%20sal%C3%A1ta.jpg?ph=d63f6b7d08"),
    ("Enteriőr", "gal-04-terasz.jpg", "https://d63f6b7d08.clvaw-cdnwnd.com/1620f4267c88d779d678491c6932edeb/200000156-0eb9b0eb9d/700/07.JPG?ph=d63f6b7d08"),
    ("Tálalás", "gal-05-talalas.jpg", "https://d63f6b7d08.clvaw-cdnwnd.com/1620f4267c88d779d678491c6932edeb/200000147-a5ddea5de0/700/IMG_20180524_114711.jpg?ph=d63f6b7d08"),
    ("Hangulat", "gal-06-ebed.jpg", "https://d63f6b7d08.clvaw-cdnwnd.com/1620f4267c88d779d678491c6932edeb/200000146-4c3854c388/700/Eb%C3%A9d.jpg?ph=d63f6b7d08"),
]


def try_discover_bagett_from_page() -> str | None:
    """If hard-coded bagett URL 404s, discover from live HTML."""
    req = urllib.request.Request(
        "https://www.goletterem.hu/goletterem/",
        headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            "Referer": "https://www.goletterem.hu/",
        },
    )
    raw = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", errors="ignore")
    t = html_lib.unescape(raw.replace("&quot;", '"'))
    for m in re.finditer(
        r"https://d63f6b7d08\.clvaw-cdnwnd\.com/1620f4267c88d779d678491c6932edeb/200000213-1709b1709e/700/[^\"]+",
        t,
    ):
        u = m.group(0).split('"')[0]
        if "bagett" in u.lower():
            return u
    return None


def fetch(url: str, dest: Path) -> None:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
            "Referer": "https://www.goletterem.hu/",
            "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        },
    )
    with urllib.request.urlopen(req, timeout=90) as resp:
        dest.write_bytes(resp.read())
    print(f"OK {dest.name} ({dest.stat().st_size // 1024} KB)", file=sys.stderr)


def main() -> None:
    bagett = try_discover_bagett_from_page()
    downloads = list(DOWNLOADS)
    if bagett:
        downloads[1] = ("kenyer-bagett.webp", bagett)

    for name, url in downloads:
        dest = OUT / name
        try:
            fetch(url, dest)
        except Exception as e:
            print(f"FAIL {name} {url}\n  {e}", file=sys.stderr)
            sys.exit(1)

    for _cap, fname, url in GALLERY:
        dest = OUT / fname
        try:
            fetch(url, dest)
        except Exception as e:
            print(f"FAIL {fname} {url}\n  {e}", file=sys.stderr)
            sys.exit(1)

    print(f"Done. Files in {OUT}", file=sys.stderr)


if __name__ == "__main__":
    main()
