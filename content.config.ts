import { defineCollection, defineContentConfig } from '@nuxt/content';
import { z } from 'zod';

// The Kaizen case study, written separately in each language (the Dutch is not a translation).
const caseStudySchema = z.object({
  title: z.string(),
  description: z.string(),
});

export default defineContentConfig({
  collections: {
    kaizen_en: defineCollection({
      type: 'page',
      source: 'en/kaizen.md',
      schema: caseStudySchema,
    }),
    kaizen_nl: defineCollection({
      type: 'page',
      source: 'nl/kaizen.md',
      schema: caseStudySchema,
    }),
  },
});
