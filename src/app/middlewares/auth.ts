import  httpStatus  from 'http-status';
import { NextFunction, Request, Response } from "express";
import AppError from "../Error/AppError";
import catchAsync from "../utils/catchAsync";
import { JwtPayload } from 'jsonwebtoken';
import Config from '../Config';
import Admin from '../Models/user.model';
import jwt from "jsonwebtoken";

export const currentUser = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

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
