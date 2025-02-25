import User from "../Models/user.model";
import { Tuser } from "../type";

const createUserDB = async (payload: Tuser) => {
  const existUser = await User.findOne({ email: payload?.email });
  if (!existUser) {
    const newUser = await User.create(payload);
    return newUser;
  }
  return existUser;
};

const getUserProfileDB = async (email: string) => {
  if (email) {
    const result = await User.findOne({ email: email });
    return result;
  }
};

export const userServices = {
  createUserDB,
  getUserProfileDB,
};
