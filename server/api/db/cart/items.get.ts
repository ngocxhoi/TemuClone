import { tables, useDrizzle, eq } from "~/server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (!query.email) {
    return Response.json(
      {
        error: "User email is required",
      },
      {
        status: 400,
      }
    );
  }

  const cart = await useDrizzle()
    .select()
    .from(tables.carts)
    .where(eq(tables.carts.userEmail, query.email as string))
    .get();

  if (!cart) {
    await useDrizzle()
      .insert(tables.carts)
      .values({
        userEmail: query.email as string,
      });

    return Response.json(
      {
        message: "No items in cart, a new cart has been created.",
        items: [],
      },
      {
        status: 201,
      }
    );
  }

  const items = await useDrizzle()
    .select()
    .from(tables.cartItems)
    .where(eq(tables.cartItems.cartId, cart.id))
    .all();

  return Response.json(
    {
      message: "Cart items retrieved successfully",
      items: items,
    },
    {
      status: 200,
    }
  );
});
