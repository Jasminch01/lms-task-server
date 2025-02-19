import mongoose, { model, Schema } from "mongoose";
import { Tlecture } from "../type";

const LectureSchema = new Schema<Tlecture>(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true }, // Embedded YouTube URL
    pdfNotes: [{ type: String }], // PDF URLs
  },
  { timestamps: true }
);

const Lecture = model("Lecture", LectureSchema);

export default Lecture;
