import User from "../models/User";
import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import AppError from "../errors/AppError";

interface Request {
  name: string;
  email: string;
  password: string;
}

interface Return{
  id : string;
  name : string;
  email : string;
  created_at : Date,
  updated_at : Date;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<Return> {
    const userRepository = getRepository(User);
    const regex = new RegExp(
      /^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/
    );

    if (!email) {
      throw new AppError("User needs email");
    }

    if (!regex.test(email)) {
      throw new AppError("Email assigned to user is invalid");
    }

    if (!password || password.length < 6) {
      throw new AppError("invalid password");
    }

    if (!name || name.length == 0) {
      throw new AppError("User must have name");
    }

    const chekedUserExists = await userRepository.findOne({ where: { email } });

    if (chekedUserExists) {
      throw new AppError("Email address already used.");
    }

    const hashedPass = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPass,
    });

    await userRepository.save(user);

    return {
      id : user.id,
      name : user.name,
      email : user.email,
      created_at : user.created_at,
      updated_at : user.updated_at,
    };
  }
}
