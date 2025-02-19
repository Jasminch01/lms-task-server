"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const course_routes_1 = require("./app/Routes/course.routes");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", course_routes_1.courseRouter);
app.use((err, req, res, next) => {
    (0, globalErrorHandler_1.default)(err, req, res, next);
});
app.get("/", (req, res) => {
    res.send("server is online");
    console.log("server is running");
});
exports.default = app;
