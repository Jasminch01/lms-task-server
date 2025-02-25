"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const course_controller_1 = require("../Controllers/course.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/course/create", (0, auth_1.auth)("admin"), course_controller_1.courseController.createCourse);
router.get("/courses", course_controller_1.courseController.getCourses);
router.get("/course", course_controller_1.courseController.getCourse);
router.delete("/courses", (0, auth_1.auth)("admin"), course_controller_1.courseController.deleteCourse);
router.put("/courses", (0, auth_1.auth)("admin"), course_controller_1.courseController.renameCourse);
exports.courseRouter = router;
