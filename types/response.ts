import type { CartItems } from "~/server/database/schema";

export interface Response {
  message: string;
}

export interface GetCartItemsResponse extends Response {
  items: CartItems[];
}
