import { Router } from "express";
import UserController from "../controllers/UserController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();

const controller = new UserController();

usersRouter.get("/", controller.getAll).post("/", controller.create);

export default usersRouter;
