"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moduleSchema = new mongoose_1.Schema({
    coruseId: { type: String, required: true },
    title: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
}, {
    timestamps: true,
});
const Module = (0, mongoose_1.model)("module", moduleSchema);
exports.default = Module;
