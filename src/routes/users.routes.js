import { Router } from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  registerUser,
  registerAdmin,
  loginUser,
} from "../../src/controller/users.controller.js";
import { permission } from "../middleware/permission.middleware.js";

const usersRouter = new Router();

usersRouter.use((req, res, next) => {
  console.log("Logging: " + req.url + " time " + Date.now());

  next();
});

usersRouter.route("/").get(permission(["admin"]), getAllUsers);

usersRouter.route("/login").post(loginUser);

usersRouter.route("/register").post(registerUser);

usersRouter.route("/registerAdmin").post(permission(["admin"]), registerAdmin);

usersRouter
  .route("/:id")
  .get(permission(["admin"]), getUser)
  .put(permission(["admin"]), updateUser)
  .delete(permission(["admin"]), deleteUser);

export default usersRouter;
