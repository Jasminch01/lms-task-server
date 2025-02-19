import mongoose, { model, Schema } from "mongoose";
import { Tmodule } from "../type";

const moduleSchema = new Schema<Tmodule>(
  {
    courseId: { type: String, ref: "Course", required : true},
    title: { type: String, required: true },
    moduleNumber: { type: Number,},
  },
  {
    timestamps: true,
  }
);

moduleSchema.pre("save", async function (next) {
  if (!this.moduleNumber) {
    const lastModule = await Module.findOne({ courseId: this.courseId })
      .sort("-moduleNumber") // Get the latest module
      .select("moduleNumber");

    this.moduleNumber = lastModule ? lastModule.moduleNumber + 1 : 1;
  }
  next();
});

const Module = model<Tmodule>("Module", moduleSchema);

export default Module;
