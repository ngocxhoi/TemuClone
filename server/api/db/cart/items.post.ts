import { tables, useDrizzle, eq } from "~/server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, productId, quantity } = body;

  const cart = await useDrizzle()
    .select()
    .from(tables.carts)
    .where(eq(tables.carts.userEmail, email))
    .get();

  if (!cart) {
    return Response.json(
      {
        error: "Cart not found",
      },
      {
        status: 404,
      }
    );
  }

  const cartItemsExist = await useDrizzle()
    .select()
    .from(tables.cartItems)
    .where(
      and(
        eq(tables.cartItems.cartId, cart.id),
        eq(tables.cartItems.productId, productId)
      )
    )
    .get();

  if (cartItemsExist) {
    await useDrizzle()
      .update(tables.cartItems)
      .set({
        quantity: quantity + cartItemsExist.quantity,
      })
      .where(eq(tables.cartItems.id, cartItemsExist.id));
  } else {
    await useDrizzle().insert(tables.cartItems).values({
      cartId: cart.id,
      productId,
      quantity,
    });
  }

  return Response.json(
    {
      message: "Item added to cart",
    },
    {
      status: 201,
    }
  );
});
