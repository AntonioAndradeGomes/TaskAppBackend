import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import User from "../models/User";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User | undefined;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    if((!email || email.length == 0) || (!password || password.length < 6) ){
      throw new Error("Incorrect email/password combination.");
    }

    const user = await usersRepository
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.name",
        "user.email",
        "user.password",
        "user.created_at",
        "user.updated_at",
      ])
      .where("user.email = :email", { email: email })
      .getOne();

    if(!user){
      throw new Error("Incorrect email/password combination.");
    }

    const passMatched = await compare(password, user.password);

    if(!passMatched){
      throw new Error("Incorrect email/password combination.");
    }

    const {secret, expiresIn} = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const soughtUser = await usersRepository.findOne({where : {email}});

    return {
      user : soughtUser,
      token,
    }
  }
}
