import { Router } from "express";
import { courseController } from "../Controllers/course.controller";
import { currentUser } from "../middlewares/auth";

const router = Router();

router.post("/course/create", currentUser(), courseController.createCourse);
router.get("/courses", courseController.getCourses);
router.delete("/courses", currentUser(), courseController.deleteCourse);
router.put("/courses", currentUser(), courseController.renameCourse);

export const courseRouter = router;
