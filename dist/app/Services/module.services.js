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
exports.moduleServices = {
    createModuleDB,
    getModulesDB,
};
