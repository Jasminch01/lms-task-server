import express, { Application, Request, Response } from "express";
import cors from "cors";
import { courseRouter } from "./app/Routes/course.routes";
const app: Application = express();

app.use(express.json());

app.use(cors());
app.use("/api", courseRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("server is online");
  console.log("server is running");
});

export default app;
