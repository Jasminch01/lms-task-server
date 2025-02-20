import { Router } from "express";
import { lectureControllers } from "../Controllers/lecture.controller";
import { currentUser } from "../middlewares/auth";

const router = Router();

router.post(
  "/lectures/create",
  currentUser(),
  lectureControllers.createLecture
);
router.get("/lectures", lectureControllers.getLectures);
router.put("/lectures", currentUser(), lectureControllers.editLecture);
router.delete("/lectures", currentUser(), lectureControllers.delectLecture);
export const lectureRouter = router;
