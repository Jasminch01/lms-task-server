import { Router } from "express";
import { lectureControllers } from "../Controllers/lecture.controller";

const router = Router();

router.post("/lectures/create", lectureControllers.createLecture); //task : have authenticate user is admin
router.get("/lectures", lectureControllers.getLectures);
router.put("/lectures", lectureControllers.editLecture);
router.delete("/lectures", lectureControllers.delectLecture);
export const lectureRouter = router;
