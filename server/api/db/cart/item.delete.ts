export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { cartItemId } = body;

  if (!cartItemId) {
    return Response.json(
      {
        error: "Cart item id is required",
      },
      {
        status: 400,
      }
    );
  }

  await useDrizzle()
    .delete(tables.cartItems)
    .where(eq(tables.cartItems.id, cartItemId));

  return Response.json(
    {
      message: "Cart item deleted successfully",
    },
    { status: 200 }
  );
});
