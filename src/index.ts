import { Elysia } from "elysia";
import routes from "./routes";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(routes)
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia",
          description: "API description",
          version: "0.1.0",
        },
        tags: [{ name: "Users", description: "Users related endpoints" }],
      },
    })
  )
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
