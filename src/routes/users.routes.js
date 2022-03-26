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

usersRouter.route("/").get(permission(), getAllUsers);

usersRouter.route("/login").post(loginUser);

usersRouter.route("/register").post(registerUser);

usersRouter.route("/registerAdmin").post(permission(), registerAdmin);

usersRouter
  .route("/:id")
  .get(permission(), getUser)
  .put(permission(), updateUser)
  .delete(permission(), deleteUser);

export default usersRouter;
