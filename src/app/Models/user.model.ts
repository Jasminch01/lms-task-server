import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { Tuser } from "../type";

const AdminSchema = new Schema<Tuser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

// Hash password before saving
// AdminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

const User = model<Tuser>("User", AdminSchema);

export default User;
