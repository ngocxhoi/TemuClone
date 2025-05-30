export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { cartItemId, quantity } = body;

  if (!cartItemId || !quantity) {
    return Response.json(
      {
        error: "Cart item id and quantity are required",
      },
      {
        status: 400,
      }
    );
  }

  await useDrizzle()
    .update(tables.cartItems)
    .set({
      quantity,
    })
    .where(eq(tables.cartItems.id, cartItemId));

  return Response.json(
    {
      message: "Cart item updated successfully",
    },
    { status: 200 }
  );
});
