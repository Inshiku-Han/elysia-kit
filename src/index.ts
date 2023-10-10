import { swagger } from "@elysiajs/swagger";
import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";

const db = new PrismaClient();

const users = new Elysia({ prefix: "/users" })
  .get("/", async () => db.user.findMany(), {
    detail: {
      tags: ["Users"],
      responses: t.Array(
        t.Object({
          id: t.Number(),
          email: t.String(),
          name: t.Nullable(t.String()),
        })
      ),
    },
  })
  .post(
    "/",
    async ({ body }) =>
      db.user.create({
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
      detail: {
        tags: ["Users"],
        responses: t.Object({
          id: t.Number(),
          email: t.String(),
          name: t.Nullable(t.String()),
        }),
      },
    }
  );

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(
    swagger({
      path: "/swagger",
      documentation: {
        info: {
          title: "Elysia",
          version: "1.0.0",
        },
        tags: [{ name: "Users", description: "Users related endpoints" }],
      },
    })
  )
  .group("/v1", (app) => app.get("/", () => "Using v1").use(users))
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
