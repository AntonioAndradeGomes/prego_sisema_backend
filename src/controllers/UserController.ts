import { Request, Response } from "express";
import User from "../models/User";
import CreateUserService from "../services/CreateUserService";

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return response.json(user);
  }
}
