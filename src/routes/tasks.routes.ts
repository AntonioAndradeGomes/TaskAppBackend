import { Router } from "express";
import TaskController from "../controllers/task.controller";
import CreateTaskService from "../services/CreateTaskService";

const tasksRoutes = Router();

const taskController = new TaskController();

tasksRoutes
  .get("/", taskController.readAll)

  .post("/", async (request, response) => {
    const { text_task, due_date } = request.body;
    const createTask = new CreateTaskService();
    const task = await createTask.execute({ due_date, text_task });
    return response.status(201).json(task);
  })

  .put("/:idTask", taskController.update)

  .delete("/:idTask", taskController.delete);

export default tasksRoutes;
