import { Router } from "express";
import tasksRoutes from "../routes/tasks.routes";
import usersRouter from "../routes/users.routes";
import sessionsRouter from "../routes/sessions.routes";

const routes = Router();

routes.use("/tasks", tasksRoutes);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

export default routes;
