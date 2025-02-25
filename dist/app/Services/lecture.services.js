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
exports.lectureServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const lecture_modal_1 = __importDefault(require("../Models/lecture.modal"));
const module_model_1 = __importDefault(require("../Models/module.model"));
const course_model_1 = __importDefault(require("../Models/course.model"));
const mongoose_1 = require("mongoose");
const createLectureDB = (newLecture) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_modal_1.default.create(newLecture);
    return result;
});
const getLecturesDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_modal_1.default.find();
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Lectures are not found");
    }
    return result;
});
const getLecturesWithCourseIdModuleIdDB = (courseId, moduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const courseObjectId = new mongoose_1.Types.ObjectId(courseId);
    const moduleObjectId = new mongoose_1.Types.ObjectId(moduleId);
    const existCourse = yield course_model_1.default.findById(courseObjectId);
    if (!existCourse) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    }
    // Check if the module exists and belongs to the provided course
    const existModule = yield module_model_1.default.findOne({ _id: moduleObjectId, courseId });
    if (!existModule) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Module not found or does not belong to the course");
    }
    const lectures = yield lecture_modal_1.default.find({ moduleId: existModule._id });
    if (!lectures) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "lectures not found");
    }
    return lectures;
});
const getLecturesWithCourseModuleNameDB = (courseName, moduleName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the course by course name
        const course = yield course_model_1.default.findOne({ title: courseName });
        if (!course) {
            throw new Error("Course not found");
        }
        // Find the module by module name and courseId
        const module = yield module_model_1.default.findOne({
            title: moduleName,
            courseId: course._id,
        });
        if (!module) {
            throw new Error("Module not found");
        }
        const lectures = yield lecture_modal_1.default.find({ moduleId: module._id });
        return lectures;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "lectures not found");
    }
});
const editLectureDB = (lectureId, updateLecture) => __awaiter(void 0, void 0, void 0, function* () {
    const lecture = yield lecture_modal_1.default.findById(lectureId);
    if (!lecture) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "lecture not found");
    }
    const result = lecture_modal_1.default.findByIdAndUpdate(lectureId, updateLecture, {
        new: true,
    });
    return result;
});
const deleteLectureDB = (lectureId) => __awaiter(void 0, void 0, void 0, function* () {
    const lecture = yield lecture_modal_1.default.findById(lectureId);
    console.log(lecture);
    if (!lecture) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "lecture not found");
    }
    const result = yield lecture_modal_1.default.findByIdAndDelete(lectureId);
    return result;
});
exports.lectureServices = {
    createLectureDB,
    getLecturesDB,
    editLectureDB,
    deleteLectureDB,
    getLecturesWithCourseModuleNameDB,
    getLecturesWithCourseIdModuleIdDB,
};
