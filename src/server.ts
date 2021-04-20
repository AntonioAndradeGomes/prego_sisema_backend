import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import routes from './routes/index';
import './database';
import AppError from "./errors/AppError";

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, resonse: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return resonse
        .status(err.statusCode)
        .json({ status: "error", message: err.message });
    }
    console.error(err);
    return resonse
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
);

app.listen(4444, () => {
  console.log('Servidor do PregoSistema executando na porta 4444 🚀🌟')
});
