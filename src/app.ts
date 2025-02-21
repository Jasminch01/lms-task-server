import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { courseRouter } from "./app/Routes/course.routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { moduleRouter } from "./app/Routes/module.routes";
import { lectureRouter } from "./app/Routes/lecture.routes";
import { userRouter } from "./app/Routes/user.routes";
import cookieparser from "cookie-parser"
const app: Application = express();

app.use(express.json());
app.use(cookieparser())

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use("/api", courseRouter);
app.use("/api", moduleRouter);
app.use("/api", lectureRouter);
app.use("/api", userRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});
app.get("/", (req: Request, res: Response) => {
  res.send("server is online");
  console.log("server is running");
});

export default app;
