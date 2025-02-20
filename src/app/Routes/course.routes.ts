import { Router } from "express";
import { courseController } from "../Controllers/course.controller";
import { auth, currentUser } from "../middlewares/auth";

const router = Router();

router.post("/course/create", auth('admin'), courseController.createCourse);
router.get("/courses", courseController.getCourses);
router.delete("/courses", auth('admin'), courseController.deleteCourse);
router.put("/courses", auth('admin'), courseController.renameCourse);

export const courseRouter = router;
