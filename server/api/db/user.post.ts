import { tables, useDrizzle, eq } from "~/server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const { email, name, picture } = data;

  if (!data) {
    return Response.json(
      {
        message: "No data provided",
      },
      { status: 500 }
    );
  }

  const existingUser = await useDrizzle()
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, email))
    .get();
  if (existingUser) {
    return Response.json(
      {
        message: "User already exists",
        data: {
          email: email,
        },
      },
      { status: 400 }
    );
  }

  const user = await useDrizzle().insert(tables.users).values({
    email,
    name,
    picture,
  });

  return Response.json(
    {
      message: "User created successfully",
      data: user,
    },
    { status: 201 }
  );
});
