import { Router } from "express";
import { lectureControllers } from "../Controllers/lecture.controller";
import { auth, currentUser } from "../middlewares/auth";

const router = Router();

router.post(
  "/lectures/create",
  auth("admin"),
  lectureControllers.createLecture
);
router.get("/lectures", currentUser(), lectureControllers.getLectures);
router.get("/lectures/filter", auth('admin'), lectureControllers.getLecturesWithCourseIdModuleId);
router.post("/lectures", currentUser(), lectureControllers.getLecturesWithCourseModuleName);
router.put("/lectures", auth("admin"), lectureControllers.editLecture);
router.delete("/lectures", auth("admin"), lectureControllers.delectLecture);
export const lectureRouter = router;
