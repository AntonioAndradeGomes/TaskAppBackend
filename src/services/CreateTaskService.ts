import Task from '../models/Task';
import { getRepository } from 'typeorm';

interface Request{
  text_task: string;
  due_date: Date;
}

export default class CreateTaskService{

  public async execute({text_task, due_date} : Request) : Promise<Task>{
    const taskRepository = getRepository(Task);

    if(!text_task || text_task.length == 0){
      throw new Error('place the task text');
    }

    const task = taskRepository.create({
      due_date,
      text_task,
    });

    await taskRepository.save(task);

    return task;
  }
}
