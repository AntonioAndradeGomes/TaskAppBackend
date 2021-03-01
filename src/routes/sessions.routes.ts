import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

const authenticateUserService = new AuthenticateUserService();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;
  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });
  return response.json({ user, token });
});

export default sessionsRouter;
