"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const course_controller_1 = require("../Controllers/course.controller");
const router = (0, express_1.Router)();
router.post("/course/create", course_controller_1.courseController.createCourse); //task : have authenticate user is admin
router.get("/courses", course_controller_1.courseController.getCourses);
router.delete("/courses", course_controller_1.courseController.deleteCourse);
router.put("/courses", course_controller_1.courseController.renameCourse);
exports.courseRouter = router;
