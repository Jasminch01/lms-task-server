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
exports.lectureControllers = void 0;
const lecture_services_1 = require("../Services/lecture.services");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const createLecture = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lecture = req.body;
    const result = yield lecture_services_1.lectureServices.createLectureDB(lecture);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "a new lecture created successfully",
        data: result,
    });
}));
const getLectures = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_services_1.lectureServices.getLecturesDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "lectres are retrive successfully",
        data: result,
    });
}));
const editLecture = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateLecture = req.body;
    const { id } = req.query;
    const lectureId = id;
    const result = yield lecture_services_1.lectureServices.editLectureDB(lectureId, updateLecture);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "lecture updated successfull",
        data: result,
    });
}));
const delectLecture = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const lectureId = id;
    const result = yield lecture_services_1.lectureServices.deleteLectureDB(lectureId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "lecture deleted success",
        data: result,
    });
}));
const getLecturesWithCourseModuleName = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseName, moduleName } = req.body;
    const result = yield lecture_services_1.lectureServices.getLecturesWithCourseModuleNameDB(courseName, moduleName);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "lecture found",
        data: result,
    });
}));
const getLecturesWithCourseIdModuleId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId, moduleId } = req.query;
    const courseIdString = courseId;
    const moduleIdString = moduleId;
    const result = yield lecture_services_1.lectureServices.getLecturesWithCourseIdModuleIdDB(courseIdString, moduleIdString);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "lectures are retrive successfully",
        data: result,
    });
}));
exports.lectureControllers = {
    createLecture,
    getLectures,
    editLecture,
    delectLecture,
    getLecturesWithCourseModuleName,
    getLecturesWithCourseIdModuleId,
};
