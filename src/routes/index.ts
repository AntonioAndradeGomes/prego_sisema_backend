import { Router } from "express";
import usersRouter from './user.routes';

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello world!" });
});

routes.use('/users', usersRouter);
export default routes;
