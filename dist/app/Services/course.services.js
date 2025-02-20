"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const AppError_1 = __importDefault(require("../Error/AppError"));
const course_model_1 = __importDefault(require("../Models/course.model"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../Models/user.model"));
const createCourseDB = (course) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = course;
    const result = yield course_model_1.default.create(newCourse);
    return result;
});
// const getCoursesDB = async () => {
//   const result = await Course.find();
//   return result;
// };
const getCoursesDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield course_model_1.default.find(); // Fetch all courses
    // Fetch author details for each course
    const coursesWithAuthors = yield Promise.all(courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
        const author = yield user_model_1.default.findById(course.authorId).select("name email"); // Fetch author info
        return Object.assign(Object.assign({}, course.toObject()), { author });
    })));
    return coursesWithAuthors;
});
const getCourseDB = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findById(courseId);
    if (!course) {
        throw new Error("Course not found");
    }
    const author = yield user_model_1.default.findById(course.authorId).select("name email");
    return Object.assign(Object.assign({}, course.toObject()), { author });
});
const deleteCourseDB = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCourse = yield course_model_1.default.findById(courseId);
    if (!existingCourse) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    }
    const result = yield course_model_1.default.findByIdAndDelete(courseId);
    return result;
});
const renameCourseDB = (courseId, updateCourse) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCourse = yield course_model_1.default.findById(courseId);
    if (!existingCourse) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    }
    // Update course
    const result = yield course_model_1.default.findByIdAndUpdate(courseId, updateCourse, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(400, "Update operation failed");
    }
    return result;
});
exports.CourseServices = {
    createCourseDB,
    getCoursesDB,
    getCourseDB,
    deleteCourseDB,
    renameCourseDB,
};
