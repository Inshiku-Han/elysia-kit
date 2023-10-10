import { Elysia } from "elysia";
import v1 from "./v1";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(v1)
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
