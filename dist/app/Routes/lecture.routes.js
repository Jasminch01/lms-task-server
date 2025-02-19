"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureRouter = void 0;
const express_1 = require("express");
const lecture_controller_1 = require("../Controllers/lecture.controller");
const router = (0, express_1.Router)();
router.post("/lectures/create", lecture_controller_1.lectureControllers.createLecture); //task : have authenticate user is admin
router.get("/lectures", lecture_controller_1.lectureControllers.getLectures);
router.put("/lectures", lecture_controller_1.lectureControllers.editLecture);
router.delete("/lectures", lecture_controller_1.lectureControllers.delectLecture);
exports.lectureRouter = router;
