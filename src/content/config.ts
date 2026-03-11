import { z, defineCollection } from 'astro:content';

/**
 * Blog Content Collection Configuration
 * Level Garment - Using Markdown for Blog Posts
 */
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    description: z.string(),
    descriptionEn: z.string().optional(),
    pubDate: z.date(),
    author: z.string().default('Level Garment Team'),
    image: z.string(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('Edukasi'),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};
