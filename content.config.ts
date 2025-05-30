import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { ProductSchema } from "./types/content";

export default defineContentConfig({
  collections: {
    page: defineCollection({
      type: "page",
      source: "page/**/*.md",
      schema: z.object({
        date: z.string(),
      }),
    }),

    data: defineCollection({
      type: "data",
      source: "data/**/*.json",
      schema: z.object({
        data: z.any(),
      }),
    }),

    product: defineCollection({
      type: "data",
      source: "data/products/*.json",
      schema: ProductSchema,
    }),
  },
});
