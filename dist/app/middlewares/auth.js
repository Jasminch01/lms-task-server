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
exports.currentUser = exports.auth = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const Config_1 = __importDefault(require("../Config"));
const user_model_1 = __importDefault(require("../Models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_2 = __importDefault(require("../Models/user.model"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.accessToken;
        console.log(token);
        // checking if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        // checking if the given token is valid
        const decoded = jsonwebtoken_1.default.verify(token, Config_1.default.jwt_access_secret);
        const { role, userEmail } = decoded;
        // checking if the user is exist
        const isUserExist = yield user_model_2.default.findOne({ email: userEmail });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You have no access to this route !");
        }
        next();
    }));
};
exports.auth = auth;
const currentUser = () => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.accessToken;
        // Check if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        // if the given token is valid
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, Config_1.default.jwt_access_secret);
        }
        catch (err) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid token!");
        }
        const { userEmail } = decoded;
        //if user exists
        const isUserExist = yield user_model_1.default.findOne({ email: userEmail });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found!");
        }
        next();
    }));
};
exports.currentUser = currentUser;
