import { Request, Response } from "express";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Task from "../models/Task";
import User from "../models/User";

export default class TaskController {
  public async readAll(req: Request, res: Response) {
    return res.json(
      await getRepository(Task).find({
        relations: ["user"],
        order: {
          updated_at: "DESC",
        },
      })
    );
  }

  public async readOnlyUserAuth(req: Request, res: Response) {
    const user = await getRepository(User).findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      throw new AppError("User not found", 401);
    }
    return res.json(
      await getRepository(Task).find({
        where: { user },
      })
    );
  }

  public async update(req: Request, res: Response) {
    const id = req.params.idTask;
    const body = req.body;
    const repository = getRepository(Task);

    const checkTask = await repository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!checkTask) {
      throw new AppError("Non-existent task");
    }
    //check if the task is from the authenticated user
    if (req.user.id != checkTask.user.id) {
      throw new AppError("task does not belong to the user", 401);
    }
    await repository.update(id, body);
    return res.status(200).json(await repository.findOne({ where: { id } }));
  }

  public async delete(req: Request, res: Response) {
    const id = req.params.idTask;
    const repository = getRepository(Task);
    const checkTask = await repository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!checkTask) {
      throw new AppError("Non-existent task");
    }
    //check if the task is from the authenticated user
    if (req.user.id != checkTask.user.id) {
      throw new AppError("task does not belong to the user", 401);
    }
    await repository.delete(id);
    return res.status(200).json({ message: "Task removed" });
  }
}
