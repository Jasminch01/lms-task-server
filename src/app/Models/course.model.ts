import { model, Schema } from "mongoose";
import { Tcourse } from "../type";

const courseSchema = new Schema<Tcourse>(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Course = model<Tcourse>("course", courseSchema);

export default Course;