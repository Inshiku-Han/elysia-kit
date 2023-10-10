import Elysia from "elysia";
import users from "./user";

const v1 = new Elysia().group("/v1", (app) =>
  app.get("/", () => "Using v1").use(users)
);

export default v1;
