import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import v1 from "./v1";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(
    swagger({
      path: "/swagger",
      documentation: {
        info: {
          title: "Elysia",
          version: "0.1.0",
        },
        tags: [{ name: "Users", description: "Users related endpoints" }],
      },
    })
  )
  .use(v1)
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
