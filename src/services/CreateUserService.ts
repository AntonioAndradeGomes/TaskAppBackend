import User from "../models/User";
import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const regex = new RegExp(
      /^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/
    );

    if (!email) {
      throw new Error("User needs email");
    }

    if (!regex.test(email)) {
      throw new Error("Email assigned to user is invalid");
    }

    if (!password || password.length < 6) {
      throw new Error("invalid password");
    }

    if (!name || name.length == 0) {
      throw new Error("User must have name");
    }

    const chekedUserExists = await userRepository.findOne({ where: { email } });

    if (chekedUserExists) {
      throw new Error("Email address already used.");
    }

    const hashedPass = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPass,
    });

    await userRepository.save(user);

    return user;
  }
}
