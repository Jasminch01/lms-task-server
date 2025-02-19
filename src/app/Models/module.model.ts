import mongoose, { model, Schema } from "mongoose";
import { Tmodule } from "../type";

const moduleSchema = new Schema<Tmodule>(
  {
    coruseId: { type: mongoose.Schema.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Module = model<Tmodule>("Module", moduleSchema);

export default Module;
