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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moduleSchema = new mongoose_1.Schema({
    courseId: { type: String, ref: "Course", required: true },
    title: { type: String, required: true },
    moduleNumber: { type: Number, },
}, {
    timestamps: true,
});
moduleSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.moduleNumber) {
            const lastModule = yield Module.findOne({ courseId: this.courseId })
                .sort("-moduleNumber") // Get the latest module
                .select("moduleNumber");
            this.moduleNumber = lastModule ? lastModule.moduleNumber + 1 : 1;
        }
        next();
    });
});
const Module = (0, mongoose_1.model)("Module", moduleSchema);
exports.default = Module;
