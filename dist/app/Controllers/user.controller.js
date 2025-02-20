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
const user_services_1 = require("../Services/user.services");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield user_services_1.userServices.createUserDB(user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "user created successfully",
        data: result,
    });
}));
const userSignIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCrediential = req.body;
    const { user, token } = yield user_services_1.userServices.userSignIn(userCrediential);
    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "user sign in successfully",
        data: user,
        token: token,
    });
}));
const getUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.body;
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
    userSignIn,
    getUserProfile,
};
