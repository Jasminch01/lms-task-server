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
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const Config_1 = __importDefault(require("../Config"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const createToken_1 = require("../utils/createToken");
const user_model_1 = __importDefault(require("../Models/user.model"));
const createUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (user) {
        throw new AppError_1.default(http_status_1.default.FOUND, "User already exists");
    }
    const newUser = yield user_model_1.default.create(payload);
    return newUser;
});
const userSignIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const email = payload.email;
    const password = payload.password;
    const isUserExist = yield user_model_1.default.findOne({ email: email }).select("+password");
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "user not found");
    }
    //is password match
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "password not match");
    }
    const jwtPayload = {
        userEmail: isUserExist.email,
        role: isUserExist.role,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, Config_1.default.jwt_access_secret, Config_1.default.jwt_access_expires_in);
    const userObject = isUserExist.toObject();
    // Remove the password field from the user object
    delete userObject.password;
    return {
        user: userObject,
        token: accessToken,
    };
});
const getUserProfileDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        const result = yield user_model_1.default.findOne({ email: email });
        return result;
    }
});
exports.userServices = {
    createUserDB,
    userSignIn,
    getUserProfileDB,
};
