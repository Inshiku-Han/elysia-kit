import { Elysia } from "elysia";
import users from "./user";

const routes = new Elysia({ prefix: "v1" }).use(users);

export default routes;
