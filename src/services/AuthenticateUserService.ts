import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import User from "../models/User";
import authConfig from "../config/auth";
import { sign } from "jsonwebtoken";

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

    if(!email || !password){
      throw new AppError("Incorrect email/password combination.", 401);
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


    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, { subject: user.id, expiresIn });

    const userbuscado = await usersRepository.findOne({where: {email}});

    return {
      user : userbuscado,
      token,
    };
  }
}
