import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import { readFileSync } from 'node:fs';
// Legacy URL safety net for go-live: old levelgarment.com URLs (WP) with no new
// equivalent → a relevant page, so nothing 404s. Generated from the old sitemap.
const legacyRedirects = JSON.parse(readFileSync(new URL('./src/data/legacy-redirects.json', import.meta.url), 'utf-8'));

export default defineConfig({
  site: 'https://levelgarment.com',
  redirects: { ...legacyRedirects },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    compress({
      CSS: true,
      HTML: true,
      Image: false, // CLI 6 handles this
      JavaScript: true,
      SVG: true,
    })
  ],
  output: 'static',
  build: {
    assets: '_assets'
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          assetFileNames: '_assets/[name].[hash][extname]'
        }
      }
    }
  }
});
