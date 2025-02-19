import mongoose, { Document } from "mongoose";

export type Tcourse = {
  title: String;
  price: String;
  thumbnail: String;
  description: String;
};

export interface Tmodule extends Document {
  coruseId: mongoose.Types.ObjectId;
  title: string;
  moduleNumber: Number;
}

export type Tadmin = {
  name: string;
  email: string;
  password: string;
};

export interface Tlecture extends Document {
  moduleId: mongoose.Types.ObjectId;
  title: string;
  videoUrl: string;
  pdfNotes: [string];
}
