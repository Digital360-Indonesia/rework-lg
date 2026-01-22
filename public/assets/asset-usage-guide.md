# Asset Usage Guide
## For CLI Teams 2-5 - Level Garment Astro Migration

**Maintained by:** CLI 6 - Media & Asset Optimizer
**Last Updated:** 2026-01-22

---

## Quick Reference

| Asset Type | Location | Formats | Responsive |
|------------|----------|---------|------------|
| Logos | `/assets/images/logo/` | WebP, PNG | Yes |
| Products | `/assets/images/products/{category}/` | WebP | Yes |
| Blog | `/assets/images/blog/` | WebP, JPG | Yes |
| Videos | `/assets/videos/homepage/` | MP4, WebM | N/A |
| Posters | `/assets/videos/posters/` | WebP | N/A |

---

## 1. Asset Path Convention

All assets are referenced from the `/public/` directory, so use paths starting with `/assets/`:

```astro
<!-- Correct -->
<img src="/assets/images/logo/logo-colored.webp" />

<!-- Incorrect (don't include "public") -->
<img src="/public/assets/images/logo/logo-colored.webp" />
```

---

## 2. Logo Assets

### 2.1 Available Logos

| Logo | Path | Best For |
|------|------|----------|
| Colored (main) | `/assets/images/logo/logo-colored.webp` | Light backgrounds, header |
| White | `/assets/images/logo/logo-white.webp` | Dark backgrounds, footer |
| Favicon | `/assets/images/logo/favicon.webp` | Browser tab, bookmarks |

### 2.2 Logo Sizes Available

Each logo has multiple responsive variants:

```astro
<!-- Logo with responsive variants -->
<img
  src="/assets/images/logo/logo-colored.png"
  srcset="
    /assets/images/logo/logo-colored-w32.webp 32w,
    /assets/images/logo/logo-colored-w64.webp 64w,
    /assets/images/logo/logo-colored-w128.webp 128w,
    /assets/images/logo/logo-colored-w256.webp 256w,
    /assets/images/logo/logo-colored.webp 413w
  "
  sizes="64px"
  alt="Level Garment"
/>
```

### 2.3 Recommended Logo Sizes by Context

| Context | Recommended Size | Path Suffix |
|---------|-----------------|-------------|
| Mobile header | 64px | `-w64.webp` |
| Desktop header | 128-256px | `-w128.webp` or `-w256.webp` |
| Footer | 256px | `-w256.webp` |
| Favicon | 32px | `-w32.webp` |

### 2.4 Example: Header Component (CLI 2)

```astro
---
// Header.astro
---

<header class="bg-white dark:bg-gray-900">
  <!-- Light mode logo -->
  <a href="/">
    <img
      src="/assets/images/logo/logo-colored.png"
      srcset="/assets/images/logo/logo-colored-w64.webp 64w,
              /assets/images/logo/logo-colored-w128.webp 128w"
      sizes="(max-width: 768px) 64px, 128px"
      alt="Level Garment"
      class="h-16 w-auto"
    />
  </a>
</header>
```

### 2.5 Example: Footer Component (CLI 2)

```astro
---
// Footer.astro
---

<footer class="bg-gray-900">
  <!-- White logo for dark background -->
  <a href="/">
    <img
      src="/assets/images/logo/logo-white.png"
      srcset="/assets/images/logo/logo-white-w128.webp 128w,
              /assets/images/logo/logo-white-w256.webp 256w"
      sizes="256px"
      alt="Level Garment"
      class="h-24 w-auto"
    />
  </a>
</footer>
```

---

## 3. Product Images

### 3.1 Product Categories

| Category | Path | Images Available |
|----------|------|------------------|
| T-Shirt | `/assets/images/products/tshirt/` | 3 images |
| Jersey | `/assets/images/products/jersey/` | 4 images |
| Workshirt | `/assets/images/products/workshirt/` | 5 images |
| Jacket | `/assets/images/products/jacket/` | 9 images |

### 3.2 Product Image Naming Convention

```
/assets/images/products/{category}/{name}-{size}.webp
```

**Sizes available:**
- `w320` - Mobile small (320px wide)
- `w480` - Mobile large (480px wide)
- `w640` - Tablet (640px wide)
- `w768` - Tablet large (768px wide)
- `w1024` - Desktop (1024px wide)
- No suffix = Original size (~1184px)

### 3.3 Example: Product Grid (CLI 4)

```astro
---
// ProductGrid.astro
const products = [
  { name: 'T-Shirt Basic', category: 'tshirt', id: '20250523-T-Shirt_Basic_1' },
  { name: 'Jersey Basic', category: 'jersey', id: '20250526-Jersey_1' },
  { name: 'Workshirt PDH', category: 'workshirt', id: '20250523-Workshit_PDH_1' },
  { name: 'Jacket Bomber', category: 'jacket', id: '20250523-Jacket_Bomber_1' },
];
---

<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  {products.map((product) => (
    <div class="product-card">
      <img
        src={`/assets/images/products/${product.category}/${product.id}.png`}
        srcset={`
          /assets/images/products/${product.category}/${product.id}-w320.webp 320w,
          /assets/images/products/${product.category}/${product.id}-w640.webp 640w
        `}
        sizes="(max-width: 640px) 50vw, 25vw"
        alt={product.name}
        loading="lazy"
        class="w-full aspect-square object-cover"
      />
      <h3>{product.name}</h3>
    </div>
  ))}
</div>
```

### 3.4 Example: Product Detail Page (CLI 4)

```astro
---
// ProductDetail.astro
const { category, productId, productName } = Astro.props;
---

<figure class="product-gallery">
  <img
    src={`/assets/images/products/${category}/${productId}.png`}
    srcset={`
      /assets/images/products/${category}/${productId}-w640.webp 640w,
      /assets/images/products/${category}/${productId}-w1024.webp 1024w,
      /assets/images/products/${category}/${productId}.webp 1184w
    `}
    sizes="(max-width: 1024px) 640px, 1024px"
    alt={productName}
    class="w-full max-w-4xl"
  />
</figure>
```

### 3.5 Lazy Loading Product Images

For below-fold product images, always include `loading="lazy"`:

```astro
<img
  src="/assets/images/products/tshirt/20250523-T-Shirt_Basic_2.png"
  srcset="/assets/images/products/tshirt/20250523-T-Shirt_Basic_2-w640.webp 640w"
  sizes="640px"
  alt="T-Shirt"
  loading="lazy"  <!-- Important for performance -->
/>
```

---

## 4. Blog Images

### 4.1 Blog Image Locations

```
/assets/images/blog/{filename}-{size}.webp
```

### 4.2 Available Blog Images

- `20250819_Cara-memilih-jersey-yang-tepat-untuk-aktivitas-olahraga-anda-650x387`
- `20250819_Jersey-sebagai-pilihan-fashion-casual-tampil-keren-dengan-sentuhan-olahraga-650x387`
- `20250819_Keunggulan-jersey-dalam-dunia-olahraga-kenapa-harus-memilih-jersey-berkualitas-650x387`
- `20250819_Pusat-konveksi-jaket-kelas-dan-jaket-angkatan-terbaik-di-surabaya_-650x387`
- `level01-650x387` through `level08-650x387`

### 4.3 Example: Blog Card (CLI 5)

```astro
---
// BlogCard.astro
const { title, slug, image } = Astro.props;
---

<article class="blog-card">
  <a href={`/blog/${slug}`}>
    <img
      src={`/assets/images/blog/${image}.jpg`}
      srcset={`
        /assets/images/blog/${image}-w320.webp 320w,
        /assets/images/blog/${image}-w640.webp 640w
      `}
      sizes="(max-width: 640px) 100vw, 50vw"
      alt={title}
      loading="lazy"
      class="w-full aspect-video object-cover rounded-lg"
    />
    <h2>{title}</h2>
  </a>
</article>
```

---

## 5. Video Assets

### 5.1 Available Videos

| Video | MP4 | WebM | Poster |
|-------|-----|------|--------|
| video_1 | `/assets/videos/homepage/video_1.mp4` | `/assets/videos/homepage/video_1.webm` | `/assets/videos/posters/video_1.webp` |
| video_2 | `/assets/videos/homepage/video_2.mp4` | `/assets/videos/homepage/video_2.webm` | `/assets/videos/posters/video_2.webp` |
| video_3 | `/assets/videos/homepage/video_3.mp4` | `/assets/videos/homepage/video_3.webm` | `/assets/videos/posters/video_3.webp` |
| video_4 | `/assets/videos/homepage/video_4.mp4` | `/assets/videos/homepage/video_4.webm` | `/assets/videos/posters/video_4.webp` |

### 5.2 Example: Video Component (CLI 3)

```astro
---
// VideoPlayer.astro
const { videoId, poster } = Astro.props;
---

<video
  poster={`/assets/videos/posters/${poster}.webp`}
  preload="none"
  controls
  class="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
>
  <source src={`/assets/videos/homepage/${videoId}.webm`} type="video/webm">
  <source src={`/assets/videos/homepage/${videoId}.mp4`} type="video/mp4">
  <p class="text-center">
    Your browser doesn't support HTML5 video.
    <a href={`/assets/videos/homepage/${videoId}.mp4`}>Download the video</a> instead.
  </p>
</video>
```

### 5.3 Example: Background Video (CLI 3)

```astro
---
// Hero.astro
---

<div class="hero relative h-screen">
  <video
    autoplay
    muted
    loop
    playsinline
    poster="/assets/videos/posters/video_1.webp"
    class="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/assets/videos/homepage/video_1.webm" type="video/webm">
    <source src="/assets/videos/homepage/video_1.mp4" type="video/mp4">
  </video>

  <!-- Hero content overlay -->
  <div class="relative z-10 flex items-center justify-center h-full">
    <h1>Welcome to Level Garment</h1>
  </div>
</div>
```

---

## 6. Fonts

### 6.1 Recommended Approach: Google Fonts CDN

Add to your layout `<head>`:

```astro
---
// BaseLayout.astro
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />

    <!-- Preconnect to Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">

    <!-- Or use preload for critical fonts -->
    <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLDD4Z1xlEA.woff2" as="font" type="font/woff2" crossorigin>

    <slot />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### 6.2 Font Configuration

Add to your global CSS:

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&family=Roboto:wght@400;500&display=swap');

:root {
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Roboto', sans-serif;
  --font-ui: 'Inter', sans-serif;
}

body {
  font-family: var(--font-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

button, .btn, input, select {
  font-family: var(--font-ui);
}
```

### 6.3 Font Loading Best Practices

1. **Use `font-display: swap`** for non-critical fonts
2. **Preload critical fonts** (Poppins for headings)
3. **Provide system font fallbacks**

```css
/* With font-display */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6Z1xlEA.woff2) format('woff2');
}

/* System font fallback */
body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

---

## 7. Responsive Image Patterns

### 7.1 Basic Responsive Image

```astro
<img
  src="/assets/images/products/tshirt/product.png"  <!-- Fallback -->
  srcset="
    /assets/images/products/tshirt/product-w320.webp 320w,
    /assets/images/products/tshirt/product-w640.webp 640w,
    /assets/images/products/tshirt/product-w1024.webp 1024w
  "
  sizes="
    (max-width: 640px) 320px,
    (max-width: 1024px) 640px,
    1024px
  "
  alt="Product name"
/>
```

### 7.2 Art-Directed Responsive Image

```astro
<picture>
  <!-- Mobile: Different crop -->
  <source
    media="(max-width: 640px)"
    srcset="/assets/images/products/tshirt/product-w320.webp"
  />
  <!-- Desktop: Full image -->
  <img
    src="/assets/images/products/tshirt/product-w1024.webp"
    alt="Product name"
  />
</picture>
```

### 7.3 Image with WebP Fallback

```astro
<picture>
  <!-- WebP for browsers that support it -->
  <source
    srcset="/assets/images/products/tshirt/product-w640.webp"
    type="image/webp"
  />
  <!-- PNG/JPG fallback -->
  <img
    src="/assets/images/products/tshirt/product-w640.png"
    alt="Product name"
  />
</picture>
```

---

## 8. Lazy Loading Strategy

### 8.1 When to Use Lazy Loading

**Always lazy load:**
- Images below the fold
- Product images in grid
- Blog thumbnails
- Portfolio images

**Never lazy load:**
- Logo (above fold)
- Hero images (above fold)
- Images in viewport on load

### 8.2 Lazy Loading Syntax

```astro
<!-- Lazy load with native attribute -->
<img
  src="/assets/images/blog/image.jpg"
  loading="lazy"
  alt="Blog post"
/>

<!-- Or use decoding for better performance -->
<img
  src="/assets/images/blog/image.jpg"
  loading="lazy"
  decoding="async"
  alt="Blog post"
/>
```

### 8.3 Loading State Styling

```css
/* Add background color while loading */
img[loading="lazy"] {
  background-color: #f3f4f6;
  min-height: 200px;
}

/* Fade in when loaded */
img[loading="lazy"]:loaded {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## 9. Astro Image Component (Alternative)

Astro provides a built-in Image component for optimization:

```astro
---
import { Image } from 'astro:assets';
import productImage from '@/assets/images/products/tshirt/product.png';
---

<Image
  src={productImage}
  alt="Product name"
  widths={[320, 640, 1024]}
  formats={['webp', 'png']}
/>
```

**Note:** CLI 6 has already optimized images, so you can use direct `<img>` tags with the paths provided. The Astro Image component is useful if you want automatic optimization at build time.

---

## 10. Troubleshooting

### 10.1 Images Not Displaying

**Problem:** Images show broken or not loading.

**Solutions:**
1. Check path starts with `/assets/` (not `/public/assets/`)
2. Verify file exists in the correct directory
3. Check file extension matches (`.webp` vs `.png`)
4. Use browser DevTools Network tab to see 404s

### 10.2 WebP Not Working in Safari

**Problem:** Safari shows broken images for WebP.

**Solution:** Always provide a fallback (PNG/JPG):

```astro
<picture>
  <source srcset="/assets/images/logo/logo-colored.webp" type="image/webp">
  <img src="/assets/images/logo/logo-colored.png" alt="Logo">
</picture>
```

### 10.3 Video Not Playing

**Problem:** Video doesn't play in browser.

**Solutions:**
1. Check both MP4 and WebM sources are provided
2. Verify poster image path is correct
3. Ensure `playsinline` attribute for iOS
4. Check video file is not corrupted

---

## 11. Performance Checklist

Before deploying, verify:

- [ ] All images have `alt` text
- [ ] Above-fold images use appropriate sizes
- [ ] Below-fold images have `loading="lazy"`
- [ ] WebP format used with PNG/JPG fallback
- [ ] Videos have poster images
- [ ] Videos have both MP4 and WebM sources
- [ ] Logo sizes match container size
- [ ] Font preconnect added to `<head>`
- [ ] No images in `src` larger than needed

---

## 12. Contact CLI 6

For issues or questions about optimized assets:

- **Asset Manifest:** `/public/assets/asset-manifest.json`
- **Video Report:** `/public/assets/videos/video-optimization-report.json`
- **Optimization Report:** `/public/assets/optimization-report.md`

---

**Happy coding! All assets are optimized and ready to use.**
