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
exports.moduleControllers = void 0;
const module_services_1 = require("../Services/module.services");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const createModule = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const module = req.body;
    const result = yield module_services_1.moduleServices.createModuleDB(module);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "module created successful",
    });
}));
const getModules = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield module_services_1.moduleServices.getModulesDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "modules retrives successfully",
    });
}));
const moduleUpdate = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { editedTitle } = req.body;
    const { id } = req.params;
    const result = yield module_services_1.moduleServices.moduleUpdateDB(id, editedTitle);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "module updated successfully",
    });
}));
const moduledelete = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield module_services_1.moduleServices.deleteModule(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "module deleted successfully",
    });
}));
const getModulesCourseId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const courseId = id;
    const result = yield module_services_1.moduleServices.getModulesWithCourseIdDB(courseId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        data: result,
        message: "modules are retrive successfully",
    });
}));
exports.moduleControllers = {
    createModule,
    getModules,
    getModulesCourseId,
    moduleUpdate,
    moduledelete,
};
