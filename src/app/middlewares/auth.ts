import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import AppError from "../Error/AppError";
import catchAsync from "../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import Config from "../Config";
import Admin from "../Models/user.model";
import jwt from "jsonwebtoken";
import User from "../Models/user.model";
import { TuserRole } from "../type";

export const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      Config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, userEmail } = decoded;
    // checking if the user is exist
    const isUserExist = await User.findOne({ email: userEmail });
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route !"
      );
    }
    
    next();
  });
};

export const currentUser = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    // Check if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // if the given token is valid
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        Config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (err: any) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token!");
    }
    const { userEmail } = decoded;

    //if user exists
    const isUserExist = await Admin.findOne({ email: userEmail });
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
    }
    next();
  });
};
