# Level Garment — page list (rework status)

Registry of LG pages/sections, what's done, and what still needs its own landing.
(Portfolio + Promo are parked for now — revisit later, like KG.)

## ✅ Done (reworked)
- **Homepage** (`/`) — hero story slider, Pilih Kategori, video banner, split banner, sponsorship showcase, End CTA, footer.
- **Product landing** (`/product/`) — full-width hero (media only) + "category = product type" grid (12 types) + 2 promo banners + End CTA.

## 🔜 To build (each gets its own landing/section later)
- **Product type pages** — each of the 12 types (T-Shirt, Jersey, Workshirt, Jacket, Hoodie, Sweater, Polo, Kemeja, Almamater, Topi, Totebag, Training) → its own products listing/landing.
- **Kontak** (`/kontak`) — review/rework.
- **Berita / Blog** (`/berita`) — review/rework.
- **About** — if needed.

## 🅿️ Parked (removed for now)
- **Portfolio** — figure out later.
- **Promo** — figure out later.

## Management
- **Content CMS:** Sveltia at `/admin` (settings + products wired; homepage hero/sections are still hardcoded in components — extract to JSON to make them CMS-editable).
- **Media/content checklist:** `/checklist` (LG items; saves per-device via localStorage, falls back from `/pb` — wire a PocketBase later for cross-device sharing).
