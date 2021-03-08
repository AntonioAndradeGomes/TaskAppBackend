import { Router } from "express";
import TaskController from "../controllers/task.controller";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateTaskService from "../services/CreateTaskService";

const tasksRoutes = Router();

const taskController = new TaskController();

tasksRoutes
  .get("/", taskController.readAll)

  .post("/", ensureAuthenticated, async (request, response) => {
    const { text_task, due_date } = request.body;
    const userId = request.user.id;
    const createTask = new CreateTaskService();
    const task = await createTask.execute({ due_date, text_task, userId });
    return response.status(201).json(task);
  })

  .put("/:idTask", ensureAuthenticated, taskController.update)

  .delete("/:idTask", ensureAuthenticated, taskController.delete);

export default tasksRoutes;
