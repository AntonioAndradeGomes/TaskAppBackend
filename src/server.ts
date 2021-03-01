import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import routes from "./routes/index";
import "./database";

import AppError from "./errors/AppError";

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (err : Error, request: Request, response: Response, next : NextFunction) => {
    if(err instanceof AppError){
      return response.status(err.statusCode).json({status : "error", message : err.message});
    }
    console.error(err);
    return response.status(500).json({status : "error", message : "Internal server error"});
  }
);

app.get('/', (request, response) =>{
  return response.json({message: 'Hello World!'});
})

app.listen(3333, () => {
  console.log("Servidor sendo executado na porta 3333");
});
