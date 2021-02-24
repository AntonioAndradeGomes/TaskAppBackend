import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

const authenticateUserService = new AuthenticateUserService();

sessionsRouter.post('/', async (request, response) =>{
  try{
    const {email, password} = request.body;
    const {user, token} = await authenticateUserService.execute({
      email,
      password
    });
    return response.json({user, token});
  }catch(e){
    return response.status(401).json({message : e.message});
  }
});

export default sessionsRouter;
