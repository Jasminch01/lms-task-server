import { Router } from "express";
import { courseController } from "../Controllers/course.controller";

const router = Router();

router.post("/course/create", courseController.createCourse); //task : have authenticate user is admin
router.get("/courses", courseController.getCourses);
router.delete("/courses", courseController.deleteCourse);
router.put("/courses", courseController.renameCourse);

export const courseRouter = router;
