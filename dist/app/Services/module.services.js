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
exports.moduleServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const module_model_1 = __importDefault(require("../Models/module.model"));
const lecture_modal_1 = __importDefault(require("../Models/lecture.modal"));
const createModuleDB = (module) => __awaiter(void 0, void 0, void 0, function* () {
    const newModule = module;
    const result = module_model_1.default.create(newModule);
    return result;
});
const getModulesDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = module_model_1.default.find();
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "there is no modules");
    }
    return result;
});
const getModulesWithCourseIdDB = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const modules = yield module_model_1.default.find({ courseId: courseId });
    if (!modules || modules.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Modules not found");
    }
    //lectures for each module
    const modulesWithLectures = yield Promise.all(modules.map((module) => __awaiter(void 0, void 0, void 0, function* () {
        const lectures = yield lecture_modal_1.default.find({ moduleId: module._id });
        return Object.assign(Object.assign({}, module.toObject()), { lectures });
    })));
    return modulesWithLectures;
});
const moduleUpdateDB = (moduleId, updateName) => __awaiter(void 0, void 0, void 0, function* () {
    const existModule = module_model_1.default.findById(moduleId);
    if (!existModule) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "module not found");
    }
    const updatedModule = yield module_model_1.default.findByIdAndUpdate(moduleId, { title: updateName }, { new: true });
    if (!updatedModule) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to update module");
    }
    return updatedModule;
});
const deleteModule = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const existModule = module_model_1.default.findById(moduleId);
    if (!existModule) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "module not found");
    }
    const deleteModule = module_model_1.default.findByIdAndDelete(moduleId);
    if (!deleteModule) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "module delete failed");
    }
    return deleteModule;
});
exports.moduleServices = {
    createModuleDB,
    getModulesDB,
    getModulesWithCourseIdDB,
    moduleUpdateDB,
    deleteModule,
};
