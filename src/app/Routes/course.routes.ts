import { Router } from "express";
import { courseController } from "../Controllers/course.controller";

const router = Router();

router.post("/createCourse", courseController.createCourse);

export const courseRouter = router;
