import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";
import { Tadmin } from "../type";

const AdminSchema = new Schema<Tadmin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Admin = model<Tadmin>("admin", AdminSchema);

export default Admin;
