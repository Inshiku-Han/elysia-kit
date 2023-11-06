import Elysia, { t } from "elysia";
import prisma from "../db";

const users = new Elysia({ name: "Users", prefix: "/users" })
  .get("/", () => prisma.user.findMany(), {
    response: t.Array(
      t.Object({
        id: t.Number(),
        email: t.String(),
        name: t.Nullable(t.String()),
      })
    ),
    detail: {
      tags: ["Users"],
    },
  })
  .post(
    "/",
    ({ body }) =>
      prisma.user.create({
        data: body,
        select: { id: true, name: true, email: true },
      }),
    {
      error: ({ error }) => {
        console.log(error);
        return error;
      },
      body: t.Object({
        email: t.String(),
        name: t.Optional(t.String()),
      }),
      response: t.Object({
        id: t.Number(),
        email: t.String(),
        name: t.Nullable(t.String()),
      }),
      detail: {
        tags: ["Users"],
      },
    }
  );

export default users;
