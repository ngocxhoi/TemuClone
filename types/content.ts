import { z } from "zod";

export const ProductSchema = z.object({
  uuid: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
});

export type ProductItem = z.infer<typeof ProductSchema>;
