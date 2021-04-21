import {  Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRoutes = Router();

sessionsRoutes.post("/", async (req, res) =>{
  const {email, password} = req.body;

  const authenticateService = new AuthenticateUserService();

  const result = await authenticateService.execute({email, password});

  return res.json(result);
});

export default sessionsRoutes;
