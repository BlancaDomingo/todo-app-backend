import { Router } from "express";
import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../../src/controller/todos.controller.js";
import { permission } from "../middleware/permission.middleware.js";

const todosRouter = new Router();

todosRouter.use((req, res, next) => {
  console.log("Logging: " + req.url + " time " + Date.now());

  next();
});

todosRouter
  .route("/:id")

  .get(permission(["admin", "user"]), getAllTodos)
  .post(permission(["admin", "user"]), addTodo);

todosRouter
  .route("/:idUser/:idTodo")
  .put(permission(["admin", "user"]), updateTodo)
  .delete(permission(["admin", "user"]), deleteTodo);

export default todosRouter;
