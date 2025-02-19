"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LectureSchema = new mongoose_1.Schema({
    moduleId: {
        type: String,
        ref: "Module",
        required: true,
    },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true }, // Embedded YouTube URL
    pdfNotes: [{ type: String }], // PDF URLs
}, { timestamps: true });
const Lecture = (0, mongoose_1.model)("Lecture", LectureSchema);
exports.default = Lecture;
