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
exports.userController = void 0;
const Config_1 = __importDefault(require("../Config"));
const user_services_1 = require("../Services/user.services");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const createToken_1 = require("../utils/createToken");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield user_services_1.userServices.createUserDB(user);
    const jwtPayload = {
        userEmail: result.email,
        role: result.role,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, Config_1.default.jwt_access_secret, Config_1.default.jwt_access_expires_in);
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // Cookie is accessible only by the web server
        secure: true, //true for prod
        sameSite: "none",
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "user created successfully",
        data: result,
    });
}));
const userLogout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", { path: "/", httpOnly: true, secure: true });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "logged out successfully",
        data: "logged out successfully",
    });
}));
const getUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    const userEmail = email;
    const result = yield user_services_1.userServices.getUserProfileDB(userEmail);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "access user profile succssfully",
        data: result,
    });
}));
exports.userController = {
    createUser,
    getUserProfile,
    userLogout,
};
