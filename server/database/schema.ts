import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  picture: text("picture"),
  createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
});

export const carts = sqliteTable("carts", {
  id: integer("id").primaryKey(),
  userEmail: text("userEmail")
    .notNull()
    .references(() => users.email),
  createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updatedAt").default(sql`(CURRENT_TIMESTAMP)`),
});

export const cartItems = sqliteTable("cart_items", {
  id: integer("id").primaryKey(),
  cartId: integer("cartId")
    .notNull()
    .references(() => carts.id),
  productId: integer("productId").notNull(),
  quantity: integer("quantity").notNull(),
  addedAt: text("addedAt").default(sql`(CURRENT_TIMESTAMP)`),
});

export type CartItems = typeof cartItems.$inferSelect;
