import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { courseRouter } from "./app/Routes/course.routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { moduleRouter } from "./app/Routes/module.routes";
const app: Application = express();

app.use(express.json());

app.use(cors());
app.use("/api", courseRouter);
app.use('/api', moduleRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});
app.get("/", (req: Request, res: Response) => {
  res.send("server is online");
  console.log("server is running");
});

export default app;
