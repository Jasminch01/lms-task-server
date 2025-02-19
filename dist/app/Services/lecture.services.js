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
};
