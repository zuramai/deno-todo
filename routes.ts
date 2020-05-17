import { Router } from "https://deno.land/x/oak/mod.ts";
import TodoController from "./controllers/TodoController.ts";

const todoController = new TodoController;

const router = new Router();
router
  .get("/", function(ctx) {
        ctx.response.body = "Hello world!";
  })
  .get("/todo", todoController.index)
  .get("/todo/create", todoController.create)
  .post("/todo", todoController.store)
  .get("/todo/:id", todoController.show)
  .get("/todo/edit/:id", todoController.edit)
  .put("/todo/:id", todoController.update)
  .delete("/todo/:id", todoController.destroy)

export default router;