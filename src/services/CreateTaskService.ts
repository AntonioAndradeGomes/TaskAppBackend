import Task from '../models/Task';
import User from '../models/User';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

interface Request{
  text_task: string;
  due_date: Date;
  userId : string;
}

export default class CreateTaskService{

  public async execute({text_task, due_date, userId} : Request) : Promise<Task>{
    const taskRepository = getRepository(Task);
    const userRepository = getRepository(User);

    if(!userId){
      throw new AppError("Unauthenticated user", 401);
    }

    const user = await userRepository.findOne({where : {id: userId}});

    if(!user){
      throw new AppError("Unauthenticated user", 401);
    }

    if(!text_task || text_task.length == 0){
      throw new AppError('place the task text');
    }

    const task = taskRepository.create({
      due_date,
      text_task,
      user,
    });

    await taskRepository.save(task);


    return task;
  }
}
