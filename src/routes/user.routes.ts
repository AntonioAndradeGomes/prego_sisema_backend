import { Router } from "express";
import UserController from "../controllers/UserController";

const usersRouter = Router();

const controller = new UserController();

usersRouter.post("/", controller.create);

export default usersRouter;
