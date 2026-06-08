---
# Level Garment — design tokens (source of truth for the rework)
brand: Level Garment
colors:
  primary: "#AF7AD5"        # Level purple — playful, youthful, creative
  primary-light: "#C494E0"
  primary-dark: "#9A66C2"
  secondary: "#1E3A5F"      # deep navy — trust, structure
  secondary-light: "#2A4A73"
  secondary-dark: "#152E4D"
  accent: "#FFC107"         # amber/gold — energy, highlight, "level up"
  accent-light: "#FFD54F"
  accent-dark: "#FFA000"
  ink: "#1A1A2E"            # near-black headings/text
  ink-soft: "#4A4A5A"
  bg: "#FFFFFF"
  bg-soft: "#F6F3FB"        # faint purple-tinted panel
  line: "#E9E4F2"
typography:
  heading: "Inter"          # also Poppins/Montserrat available
  body: "Inter"
  weights: [300, 400, 500, 600, 700, 800]
rounded: "0.9rem"           # friendly, rounded (vs KG's sharper corners)
spacing: comfortable
components:
  buttons: pill / rounded, purple primary, amber for emphasis CTAs
  cards: rounded, soft shadow, photo-led
mood: playful · youthful · community · campus/school energy
---

# Level Garment — brand study

**One line:** the **student/pelajar-focused** konveksi sister-brand — class jackets (*jaket kelas/angkatan*), jerseys (baseball + school), workshirts, school uniforms — Surabaya, serving SMA/SMP + university orgs across Indonesia.

## Who it's for (segment)
- **K-12 + university students/communities.** Clients are schools and campus orgs: *Jersey SMA 3 Tuban, SMP TNH Mojokerto, MBI Amanatul Ummah, CIMSA Universitas Pelita Harapan, Actuarial UNESA, Baseball squads.* Class merch, angkatan jackets, event/organization apparel.
- This is the **key difference from Kustom Garment:** KG is the broad, professional sibling (business / community / campus / personal, B2B + corporate). **LG is narrow + youth:** students, classes, campus events. Same company (Digital360), same VPS, different audience.

## Voice & tone
- **Playful, youthful, community-energy.** Wordplay on the name: *"Yuk Level Up Acara-mu!"*, *"Wujudkan Kebersamaan & Kreatifitas."* Casual idiomatic Indonesian, fun, peer-to-peer — not corporate. "Gratis desain!" energy. Tagline: *Konveksi Pelajar Surabaya & Indonesia.*

## Visual identity
- **Color:** **purple `#AF7AD5`** is the signature (creative/youthful) — vs KG's bold orange. Supported by navy `#1E3A5F` (structure) + amber `#FFC107` (energy/highlight). Use purple as the brand lead, amber sparingly for "level up" emphasis CTAs.
- **Type:** **Inter** (friendly modern sans; Poppins/Montserrat also loaded) — approachable, vs KG's SF-Pro mono-tech feel.
- **Logo:** "level" wordmark; full set in `public/assets/images/logo/` — `logo-colored.{webp,png}` (purple) + `logo-white.{webp,png}` + favicons (32–256). Use colored on light, white on purple/dark.
- **Feel:** rounder, friendlier, more colorful than KG. Photo-led (real school/class projects).

## What we keep vs what we rework
- **Keep (LG's own):** logo, the purple/navy/amber palette, the youthful student voice, the segment focus, the 74-project portfolio + product categories (T-Shirt, Jersey, Workshirt, Jacket).
- **Rework (mirror from KG):** Sveltia CMS, auto-deploy + publish flow, design polish (hero, product cards, motion, mobile `<picture>` images), the bug-fixes/perf patterns, optionally the customizer + PocketBase PMS for custom jerseys/jackets — all re-skinned to LG's brand (purple, Inter, playful), NOT KG's.

> Mandatory design pipeline: all UI for the LG rework reads these tokens. Purple is primary; do not bring KG's orange/SF-Pro into LG.
