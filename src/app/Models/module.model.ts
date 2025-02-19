import { model, Schema } from "mongoose";
import { Tmodule } from "../type";

const moduleSchema = new Schema<Tmodule>(
  {
    coruseId: { type: String, required: true },
    title: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Module = model<Tmodule>("module", moduleSchema);

export default Module;
