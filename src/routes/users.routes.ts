import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter  = Router();

usersRouter.post("/", async (request, response) => {
  try{
    const createUserService = new CreateUserService();
    const {name, email, password} = request.body;

    const user = await createUserService.execute({
      name,
      email,
      password
    });

    const userReturn = {
      id : user.id,
      name : user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at : user.updated_at,
    }
    return response.status(201).json(userReturn);
  }catch(e){
    return response.status(400).json({ message: e.message });
  }
});


export default usersRouter
