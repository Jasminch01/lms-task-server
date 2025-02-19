"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const course_controller_1 = require("../Controllers/course.controller");
const router = (0, express_1.Router)();
router.post("/createCourse", course_controller_1.courseController.createCourse);
exports.courseRouter = router;
