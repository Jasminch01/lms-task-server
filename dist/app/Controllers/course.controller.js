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
exports.courseController = void 0;
const course_services_1 = require("../Services/course.services");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const createCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = req.body;
    const result = yield course_services_1.CourseServices.createCourseDB(course);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "a new course created Successfuly",
    });
}));
const getCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_services_1.CourseServices.getCoursesDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "retrive all courses successfuly",
    });
}));
const deleteCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.query;
    const id = courseId;
    const result = yield course_services_1.CourseServices.deleteCourseDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "course deleted Successfully",
    });
}));
const renameCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { courseId } = req.query;
    const id = courseId;
    const updateCourse = req.body;
    const result = yield course_services_1.CourseServices.renameCourseDB(id, updateCourse);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: ((_a = result.errors) === null || _a === void 0 ? void 0 : _a.message) || "course updated Successfully",
    });
}));
exports.courseController = {
    createCourse,
    getCourses,
    deleteCourse,
    renameCourse,
};
