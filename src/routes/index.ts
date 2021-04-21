import { Router } from "express";
import sessionsRoutes from "./sessions.routes";
import usersRouter from './user.routes';

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello world!" });
});

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRoutes);

export default routes;
