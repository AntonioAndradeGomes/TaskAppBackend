import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';

export default class UsersController{

  public async update(req: Request, res : Response){
    const id = req.user.id;
    if(!id){
      ///return res.status(401).json({message : 'Unauthenticated user'})
      throw new AppError("Unauthenticated user", 401);
    }
    const body = req.body;
    await getRepository(User).update(id, body);
    return res.status(200).json(await getRepository(User).findOne({where : {id}}));
  }
}
