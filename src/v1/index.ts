import Elysia from "elysia";
import users from "./user";
import { swagger } from "@elysiajs/swagger";

const v1 = new Elysia({ name: "V1", prefix: "/v1" })
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia REST V1",
          version: "0.1.0",
        },
        tags: [{ name: "Users", description: "Users related endpoints" }],
      },
    })
  )
  .get("/", () => "Using v1")
  .use(users);

export default v1;
