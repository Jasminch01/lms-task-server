"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });
const Course = (0, mongoose_1.model)("Course", courseSchema);
exports.default = Course;
