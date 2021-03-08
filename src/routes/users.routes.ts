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
    return response.status(201).json(user);
  })

  .put("/", ensureAuthenticated, controller.update);

export default usersRouter;
