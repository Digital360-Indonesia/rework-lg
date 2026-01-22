# Level Garment Migration Checklist

**Project:** Astro Migration
**Orchestrator:** CLI 1
**Last Updated:** 2026-01-22

---

## CLI 1 - Orchestra & Project Setup ✅

### Project Initialization
- [x] Create Astro project with minimal template
- [x] Install core dependencies (astro, typescript)
- [x] Install integrations (@astrojs/tailwind, @astrojs/sitemap, astro-compress)
- [x] Install dev dependencies (tailwindcss, postcss, autoprefixer, sharp)
- [x] Initialize git repository

### Folder Structure
- [x] Create src/components/{layout,home,product,content,ui}
- [x] Create src/layouts/
- [x] Create src/pages/{product,promo,berita,kontak,katalog-jersey-baseball}
- [x] Create src/styles/
- [x] Create src/data/
- [x] Create public/assets/{images,videos,fonts}

### Configuration Files
- [x] astro.config.mjs
- [x] tailwind.config.cjs
- [x] tsconfig.json (Astro default)
- [x] package.json

### Layout Files
- [x] BaseLayout.astro
- [x] PageLayout.astro
- [x] BlogLayout.astro

### Global Styles
- [x] src/styles/global.css

### Site Configuration
- [x] src/data/site-config.json

### Placeholder Pages
- [x] src/pages/index.astro (CLI 3)
- [x] src/pages/product/index.astro (CLI 4)
- [x] src/pages/promo/index.astro (CLI 5)
- [x] src/pages/berita/index.astro (CLI 5)
- [x] src/pages/berita/[slug].astro (CLI 5)
- [x] src/pages/kontak/index.astro (CLI 5)
- [x] src/pages/katalog-jersey-baseball/index.astro (CLI 5)

### Placeholder Components
- [x] src/components/layout/Header.astro (CLI 2)
- [x] src/components/layout/Footer.astro (CLI 2)
- [x] src/components/layout/Navigation.astro (CLI 2)

### Documentation
- [x] project-setup-report.md
- [x] cli-coordination-plan.md
- [x] migration-checklist.md

---

## CLI 2 - Header & Footer Components 🔴 TODO

### Header Component
- [ ] Extract header HTML from `/levelgarment-final/html/index.html`
- [ ] Create responsive desktop navigation
- [ ] Implement mobile hamburger menu
- [ ] Add mobile menu overlay
- [ ] Implement menu toggle functionality
- [ ] Add logo (colored version for header)
- [ ] Add "Promo" CTA button in header
- [ ] Style all breakpoints (mobile, tablet, desktop)
- [ ] Add smooth transitions
- [ ] Test keyboard navigation

### Navigation Component
- [ ] Create Navigation.astro component
- [ ] Extract navigation items from site-config.json
- [ ] Implement active state highlighting
- [ ] Add dropdown menus if needed
- [ ] Create mobile navigation variant
- [ ] Add close on link click (mobile)

### Footer Component
- [ ] Extract footer HTML from `/levelgarment-final/html/index.html`
- [ ] Add company info section
- [ ] Add navigation links section
- [ ] Add contact information section
- [ ] Add address section
- [ ] Add social media links
- [ ] Add copyright section
- [ ] Style all breakpoints
- [ ] Add logo (white version for footer dark bg)

### Integration
- [ ] Update Header.astro placeholder
- [ ] Update Footer.astro placeholder
- [ ] Update Navigation.astro placeholder
- [ ] Test in all page contexts
- [ ] Verify responsive behavior

---

## CLI 3 - Homepage Sections 🔴 TODO

### Hero Section
- [ ] Create Hero.astro component
- [ ] Extract hero content from index.html
- [ ] Add main headline
- [ ] Add subheadline/tagline
- [ ] Add primary CTA button (WhatsApp)
- [ ] Add secondary CTA button (Products)
- [ ] Style background/gradient
- [ ] Add animations
- [ ] Make responsive

### Video Gallery Section
- [ ] Create VideoGallery.astro component
- [ ] Extract video paths from assets
- [ ] Create video cards with thumbnails
- [ ] Implement video playback
- [ ] Add video descriptions
- [ ] Style grid layout
- [ ] Make responsive (1 col mobile, 2 col desktop)

### Features Section
- [ ] Create Features.astro component
- [ ] Extract 4 key features
- [ ] Create feature cards with icons
- [ ] Add feature descriptions
- [ ] Style cards
- [ ] Make responsive

### CTA Sections
- [ ] Create CTASection.astro component
- [ ] "Yuk Level Up Acara-mu!" section
- [ ] Add headline and description
- [ ] Add WhatsApp CTA button
- [ ] Style background (accent color)
- [ ] Make responsive

### Homepage Integration
- [ ] Update src/pages/index.astro
- [ ] Import all components
- [ ] Arrange sections in correct order
- [ ] Test scroll behavior
- [ ] Verify all CTAs work

---

## CLI 4 - Product Catalog System 🔴 TODO

### Product Data
- [ ] Extract all products from product page HTML
- [ ] Create src/data/products.json
- [ ] Organize by categories
- [ ] Add product titles
- [ ] Add product descriptions
- [ ] Add product image paths
- [ ] Add WhatsApp links

### Product Grid Component
- [ ] Create ProductGrid.astro
- [ ] Implement responsive grid
- [ ] Handle category filtering
- [ ] Add loading states

### Product Card Component
- [ ] Create ProductCard.astro
- [ ] Display product image
- [ ] Display product title
- [ ] Display product description
- [ ] Add WhatsApp CTA button
- [ ] Add hover effects
- [ ] Make responsive

### Category Navigation
- [ ] Create CategoryNav.astro
- [ ] Add anchor links to each category
- [ ] Implement smooth scroll
- [ ] Add active state on scroll
- [ ] Style for all breakpoints

### Product Page Integration
- [ ] Update src/pages/product/index.astro
- [ ] Add hero section
- [ ] Add category navigation
- [ ] Add all category sections
- [ ] Add bottom CTA section
- [ ] Test anchor navigation

### Categories to Build
- [ ] T-Shirt section
- [ ] Jersey section (Basic, Baseball, Basket)
- [ ] Workshirt section (Basic, PDH)
- [ ] Jacket section (Bomber, Coach, Parka, Trucker, Varsity)

---

## CLI 5 - Content Pages 🔴 TODO

### Promo Page
- [ ] Extract promo content from promo/index.html
- [ ] Create promo cards
- [ ] Add promo images
- [ ] Add promo descriptions
- [ ] Add validity dates
- [ ] Add WhatsApp CTAs
- [ ] Add terms & conditions
- [ ] Style layout

### Blog System
- [ ] Extract all 20 blog posts
- [ ] Create src/data/blog-posts.json
- [ ] Add post metadata (title, excerpt, date, category, slug)
- [ ] Add featured image paths

### Blog Index Page
- [ ] Create blog listing
- [ ] Create BlogCard.astro component
- [ ] Display all blog posts
- [ ] Add category badges
- [ ] Add publish dates
- [ ] Add pagination if needed
- [ ] Style grid layout

### Blog Post Template
- [ ] Update src/pages/berita/[slug].astro
- [ ] Extract post content
- [ ] Format content properly
- [ ] Add featured images
- [ ] Add author info
- [ ] Add publish dates
- [ ] Add social sharing
- [ ] Add related posts

### Contact Page
- [ ] Extract contact content from kontak/index.html
- [ ] Add phone number
- [ ] Add WhatsApp link
- [ ] Add email address
- [ ] Add physical address
- [ ] Add social media links
- [ ] Add operation hours
- [ ] Add CTA card
- [ ] Add Google Maps embed (if exists)

### Katalog Jersey Page
- [ ] Extract content from katalog-jersey-baseball
- [ ] Create jersey catalog grid
- [ ] Add jersey images
- [ ] Add jersey descriptions
- [ ] Add WhatsApp CTAs
- [ ] Add features section
- [ ] Style layout

---

## CLI 6 - Media & Asset Optimization 🔴 TODO

### Image Optimization
- [ ] Process all 59 images from assets/images/
- [ ] Convert to WebP format
- [ ] Generate responsive variants:
  - [ ] 320px (mobile)
  - [ ] 640px (tablet)
  - [ ] 960px (desktop)
  - [ ] 1280px (large desktop)
  - [ ] 1920px (full HD)
- [ ] Optimize file sizes
- [ ] Maintain quality
- [ ] Create asset manifest

### Video Optimization
- [ ] Process 4 videos from assets/videos/
- [ ] Check current compression
- [ ] Optimize if needed
- [ ] Ensure H.264 codec
- [ ] Create streaming-friendly versions

### Font Handling
- [ ] Process 8 fonts from assets/fonts/
- [ ] Convert to WOFF2 if needed
- [ ] Create font subsets if possible
- [ ] Set up preload strategy
- [ ] Configure font-display

### Asset Organization
- [ ] Organize images in public/assets/images/
- [ ] Organize videos in public/assets/videos/
- [ ] Organize fonts in public/assets/fonts/
- [ ] Move favicon files to public/
- [ ] Create asset-manifest.json

### Asset Manifest
- [ ] Map original paths to optimized paths
- [ ] Document all transformations
- [ ] Note any assets skipped

---

## Integration & Testing 🔴 TODO

### Cross-CLI Integration
- [ ] Verify all pages use Header/Footer
- [ ] Check all navigation links work
- [ ] Verify all internal links
- [ ] Check all WhatsApp CTAs
- [ ] Test all external links

### Responsive Testing
- [ ] Test mobile (320px - 767px)
- [ ] Test tablet (768px - 1023px)
- [ ] Test desktop (1024px+)
- [ ] Test all breakpoints

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify image lazy loading
- [ ] Check CSS/JS bundle sizes
- [ ] Test load times

### SEO Verification
- [ ] Check all meta titles
- [ ] Check all meta descriptions
- [ ] Verify Open Graph tags
- [ ] Verify Twitter Cards
- [ ] Check structured data
- [ ] Test sitemap generation

---

## Pre-Deployment 🔴 TODO

### Final Checks
- [ ] All placeholder files replaced
- [ ] No console errors
- [ ] All images loading
- [ ] All videos playing
- [ ] All fonts loading
- [ ] No broken links

### Build Verification
- [ ] `npm run build` succeeds
- [ ] Preview build works
- [ ] All routes accessible
- [ ] Compression working
- [ ] Sitemap generated

### Deployment Prep
- [ ] Environment variables configured
- [ ] Domain settings ready
- [ ] SSL certificate ready
- [ ] DNS configured

---

## Completion Status

| CLI | Status | Progress |
|-----|--------|----------|
| CLI 1 | ✅ Complete | 100% |
| CLI 2 | 🔴 TODO | 0% |
| CLI 3 | 🔴 TODO | 0% |
| CLI 4 | 🔴 TODO | 0% |
| CLI 5 | 🔴 TODO | 0% |
| CLI 6 | 🔴 TODO | 0% |

**Overall Progress:** 16.7% (1 of 6 CLIs complete)

---

## Notes

- All placeholder files are clearly marked with comments
- Each CLI has distinct file areas to avoid conflicts
- CLI 2 and CLI 6 can run in parallel
- CLI 3, 4, 5 must wait for CLI 2 completion
- Update this checklist as tasks are completed
