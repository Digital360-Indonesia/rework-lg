import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://levelgarment.com',
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
