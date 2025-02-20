import bcrypt  from 'bcrypt';
import httpStatus from "http-status";
import Config from "../Config";
import AppError from "../Error/AppError";
import Admin from "../Models/user.model";
import { Tadmin, TsignInAdmin } from "../type";
import { createToken } from "../utils/createToken";

const createUserDB = async (payload: Tadmin) => {
  const user = await Admin.findOne({ email: payload?.email });

  if (user) {
    throw new AppError(httpStatus.FOUND, "User already exists");
  }
  const newUser = await Admin.create(payload);
  return newUser;
};

const adminSignIn = async (payload: TsignInAdmin) => {
  const email = payload.email;
  const password = payload.password;
  const isUserExist = await Admin.findOne({ email: email }).select("+password");
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Admin not found");
  }
  //is password match
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "password not match");
  }

  const jwtPayload = {
    userEmail: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = createToken(
    jwtPayload,
    Config.jwt_access_secret as string,
    Config.jwt_access_expires_in as string
  );
  const userObject: Partial<Tadmin> = isUserExist.toObject();

  // Remove the password field from the user object
  delete userObject.password;
  return {
    user: userObject,
    token: accessToken,
  };
};

// const getUserProfileDB = async (email: JwtPayload) => {
//   if (email) {
//     const result = await User.findOne({ email: email });
//     return result;
//   }
// };


export const userServices = {
    createUserDB,
    adminSignIn,
}