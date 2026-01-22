# CLI Coordination Plan - Level Garment Migration

**Orchestrator:** CLI 1
**Last Updated:** 2026-01-22
**Status:** Ready for Execution

---

## CLI Roles & Responsibilities

### CLI 1: Orchestra & Project Coordinator ✅ COMPLETE
- **Status:** Finished
- **Deliverables:**
  - Astro project initialized
  - Folder structure created
  - Configuration files set up
  - Layouts and global styles
  - Site configuration
  - Documentation

---

### CLI 2: Header & Footer Components

**Status:** 🟡 Ready to Start
**Dependencies:** None (can start immediately)
**Input Sources:**
- `/levelgarment-final/html/index.html` (header/footer HTML)
- `/reference/homepage.png` (visual reference)

**Tasks:**
| Task | File | Priority |
|------|------|----------|
| Extract header HTML structure | `src/components/layout/Header.astro` | High |
| Create responsive navigation menu | `src/components/layout/Navigation.astro` | High |
| Implement mobile hamburger menu | `src/components/layout/Header.astro` | High |
| Add WhatsApp CTA button | `src/components/layout/Header.astro` | Medium |
| Extract footer HTML structure | `src/components/layout/Footer.astro` | High |
| Add social media links | `src/components/layout/Footer.astro` | Medium |
| Style navigation for all breakpoints | Global CSS | High |
| Test mobile menu toggle | All files | Medium |

**Expected Output:**
- Fully functional responsive Header.astro
- Fully functional Footer.astro
- Responsive Navigation.astro with mobile toggle
- All navigation items linked correctly
- WhatsApp CTA prominently displayed

**Success Criteria:**
- ✅ Desktop navigation visible on lg+ screens
- ✅ Mobile hamburger menu works on md- screens
- ✅ Smooth transitions and animations
- ✅ All links functional
- ✅ Footer displays all contact info and social links

---

### CLI 3: Homepage Sections

**Status:** 🔴 Wait for CLI 2
**Dependencies:** CLI 2 (Header/Footer)
**Input Sources:**
- `/levelgarment-final/html/index.html` (full page)
- `/reference/homepage.png` (7.9MB screenshot)
- `/levelgarment-final/assets/videos/` (4 videos)

**Tasks:**
| Task | File | Priority |
|------|------|----------|
| Create Hero section with headline | `src/components/home/Hero.astro` | High |
| Build video gallery component | `src/components/home/VideoGallery.astro` | High |
| Create CTA section components | `src/components/home/CTASection.astro` | High |
| Build features/benefits section | `src/components/home/Features.astro` | Medium |
| Integrate all sections into index.astro | `src/pages/index.astro` | High |
| Add animations and transitions | Component styles | Medium |
| Ensure responsive design | All components | High |

**Expected Output:**
- Complete `src/pages/index.astro`
- `src/components/home/Hero.astro`
- `src/components/home/VideoGallery.astro`
- `src/components/home/CTASection.astro`
- `src/components/home/Features.astro`

**Success Criteria:**
- ✅ Hero section displays main tagline and CTAs
- ✅ Video gallery shows all 4 videos
- ✅ Features section displays 4 key benefits
- ✅ All CTAs link to WhatsApp correctly
- ✅ Mobile-responsive layout

---

### CLI 4: Product Catalog System

**Status:** 🔴 Wait for CLI 2
**Dependencies:** CLI 2 (Header/Footer)
**Input Sources:**
- `/levelgarment-final/html/product/index.html` (product page)
- `/reference/produk.png` (10.2MB screenshot)
- `/levelgarment-final/assets/images/` (59 product images)

**Tasks:**
| Task | File | Priority |
|------|------|----------|
| Extract all product data to JSON | `src/data/products.json` | High |
| Create ProductGrid component | `src/components/product/ProductGrid.astro` | High |
| Build ProductCard component | `src/components/product/ProductCard.astro` | High |
| Create CategoryNav with anchors | `src/components/product/CategoryNav.astro` | High |
| Implement smooth scroll | Component scripts | Medium |
| Build product detail modal | `src/components/product/ProductDetail.astro` | Medium |
| Integrate into product page | `src/pages/product/index.astro` | High |

**Products to Extract:**
- T-Shirt (Basic)
- Jersey (Basic, Baseball, Basket)
- Workshirt (Basic, PDH)
- Jacket (Bomber, Coach, Parka, Trucker, Varsity)

**Expected Output:**
- Complete `src/pages/product/index.astro`
- `src/data/products.json` with all products
- `src/components/product/ProductGrid.astro`
- `src/components/product/ProductCard.astro`
- `src/components/product/CategoryNav.astro`
- Optional: `src/components/product/ProductDetail.astro`

**Success Criteria:**
- ✅ All 4 product categories displayed
- ✅ Category navigation with smooth scroll
- ✅ Each product has WhatsApp CTA
- ✅ Product cards show image, title, description
- ✅ Mobile-responsive grid layout

---

### CLI 5: Content Pages

**Status:** 🔴 Wait for CLI 2
**Dependencies:** CLI 2 (Header/Footer)
**Input Sources:**
- `/levelgarment-final/html/promo/index.html`
- `/levelgarment-final/html/berita/index.html`
- `/levelgarment-final/html/kontak/index.html`
- `/levelgarment-final/html/katalog-jersey-baseball/index.html`
- Reference screenshots for each page

**Tasks:**
| Task | File | Priority |
|------|------|----------|
| Build Promo page with cards | `src/pages/promo/index.astro` | High |
| Extract 20 blog posts metadata | `src/data/blog-posts.json` | High |
| Create blog listing page | `src/pages/berita/index.astro` | High |
| Build blog post template | `src/pages/berita/[slug].astro` | High |
| Create Contact page | `src/pages/kontak/index.astro` | High |
| Build Katalog Jersey page | `src/pages/katalog-jersey-baseball/index.astro` | Medium |
| Implement blog card component | `src/components/content/BlogCard.astro` | Medium |
| Add contact form or CTA | `src/pages/kontak/index.astro` | Medium |

**Blog Posts Found:**
Located in various numbered folders in `/levelgarment-final/html/`

**Expected Output:**
- `src/pages/promo/index.astro`
- `src/pages/berita/index.astro`
- `src/pages/berita/[slug].astro` (template)
- `src/pages/kontak/index.astro`
- `src/pages/katalog-jersey-baseball/index.astro`
- `src/data/blog-posts.json`
- `src/components/content/BlogCard.astro`

**Success Criteria:**
- ✅ Promo page displays active promotions
- ✅ Blog listing shows all 20 articles
- ✅ Blog posts render correctly from template
- ✅ Contact page has all info and WhatsApp CTA
- ✅ Katalog page displays jersey catalog

---

### CLI 6: Media & Asset Optimizer

**Status:** 🟡 Ready to Start
**Dependencies:** None (can start immediately)
**Input Sources:**
- `/levelgarment-final/assets/images/` (59 files)
- `/levelgarment-final/assets/videos/` (4 files, 6.8MB)
- `/levelgarment-final/assets/fonts/` (8 files)

**Tasks:**
| Task | Output | Priority |
|------|--------|----------|
| Optimize images to WebP | `public/assets/images/*.webp` | High |
| Generate responsive image variants | `public/assets/images/*-{w}.webp` | High |
| Compress videos if needed | `public/assets/videos/*.mp4` | Medium |
| Set up font loading strategy | `public/assets/fonts/*.*` + CSS | High |
| Create asset manifest | `asset-manifest.json` | Medium |
| Move favicon files | `public/favicon.*` | Low |

**Asset Processing:**

**Images (59 files):**
- Convert to WebP format
- Generate sizes: 320, 640, 960, 1280, 1920px
- Create lazy-loadable versions
- Maintain folder structure if organized

**Videos (4 files):**
- Review compression
- Ensure H.264 codec
- Consider multiple bitrates

**Fonts (8 files):**
- WOFF2 format preferred
- Subset if possible
- Configure preload strategy

**Expected Output:**
- Optimized images in `public/assets/images/`
- Optimized videos in `public/assets/videos/`
- Fonts in `public/assets/fonts/`
- `asset-manifest.json` mapping original → optimized paths

**Success Criteria:**
- ✅ All images converted to WebP
- ✅ Responsive variants generated
- ✅ Total asset size reduced by >50%
- ✅ All assets load correctly in development

---

## Execution Timeline

### Phase 1: Parallel Start (Day 1)
```
┌─────────────┐  ┌─────────────┐
│   CLI 2     │  │   CLI 6     │
│ Header/Ftr  │  │   Assets    │
└─────────────┘  └─────────────┘
      ↓                ↓
   [~2-3 hours]    [~3-4 hours]
```

### Phase 2: Content Building (Day 1-2)
**After CLI 2 completes:**
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   CLI 3     │  │   CLI 4     │  │   CLI 5     │
│  Homepage   │  │  Products   │  │   Content   │
└─────────────┘  └─────────────┘  └─────────────┘
      ↓                ↓                ↓
   [~3-4 hours]    [~4-5 hours]    [~5-6 hours]
```

### Phase 3: Integration (Day 2)
```
┌─────────────────────────────────────────┐
│         Integration & Testing            │
│  - Merge all CLI work                   │
│  - Test all pages and links             │
│  - Verify responsive behavior           │
│  - Check WhatsApp CTAs                  │
│  - Validate SEO meta tags               │
└─────────────────────────────────────────┘
                    ↓
              [~2-3 hours]
```

---

## Communication Protocol

### Update Format
Each CLI should report:
```
## CLI X Update
**Status:** [In Progress/Complete/Blocked]
**Files Modified:** List
**Next Steps:** Description
**Blockers:** Any issues requiring attention
```

### File Conflicts
- All placeholder files clearly marked
- Each CLI has distinct file areas
- No overlapping responsibilities

---

## Asset Path Reference

### Original → Optimized Paths

**Images:**
```
/wp-content/uploads/2024/06/image.png
→ /assets/images/image-optimized.webp
```

**Videos:**
```
/wp-content/uploads/2024/06/video.mp4
→ /assets/videos/video-optimized.mp4
```

**Fonts:**
```
/wp-content/fonts/font.woff2
→ /assets/fonts/font.woff2
```

---

## Ready for Execution 🚀

All CLIs (2-6) can now begin their assigned tasks.
CLI 2 and CLI 6 start immediately.
CLI 3, 4, 5 wait for CLI 2 completion.

**Orchestrator:** CLI 1 ✅ Complete
**Next Action:** CLI 2 and CLI 6 begin work
