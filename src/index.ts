import { swagger } from "@elysiajs/swagger";
import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";

const db = new PrismaClient();

const users = new Elysia({ prefix: "/users" })
  .get("/", async () => db.user.findMany(), {
    detail: { tags: ["Users"] },
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
      detail: { tags: ["Users"] },
    }
  );

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        tags: [{ name: "Users", description: "Users related endpoints" }],
      },
    })
  )
  .group("/v1", (app) => app.get("/", () => "Using v1").use(users))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
