import { defineCollection, defineContentConfig } from '@nuxt/content';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  images: z.array(z.string()),
});

export default defineContentConfig({
  collections: {
    projects_en: defineCollection({
      type: 'page',
      source: 'en/projects/**/*.md',
      schema: projectSchema,
    }),
    projects_nl: defineCollection({
      type: 'page',
      source: 'nl/projects/**/*.md',
      schema: projectSchema,
    }),
  },
});
