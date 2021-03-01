import { Router } from "express";
import UsersController from "../controllers/user.controller";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateUserService from "../services/CreateUserService";

const usersRouter = Router();
const controller = new UsersController();
usersRouter
  .post("/", async (request, response) => {
    const createUserService = new CreateUserService();
    const { name, email, password } = request.body;

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    const userReturn = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    return response.status(201).json(userReturn);
  })

  .put("/", ensureAuthenticated, controller.update);

export default usersRouter;
