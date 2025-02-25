import Config from "../Config";
import { userServices } from "../Services/user.services";
import catchAsync from "../utils/catchAsync";
import { createToken } from "../utils/createToken";
import sendResponse from "../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await userServices.createUserDB(user);

  const jwtPayload = {
    userEmail: result.email,
    role: result.role,
  };

  const accessToken = createToken(
    jwtPayload,
    Config.jwt_access_secret as string,
    Config.jwt_access_expires_in as string
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true, // Cookie is accessible only by the web server
    secure: true, //true for prod
    sameSite: "none",
  });
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "user created successfully",
    data: result,
  });
});

const userLogout = catchAsync(async (req, res) => {
  res.clearCookie("accessToken", { path: "/", httpOnly: true, secure: true });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "logged out successfully",
    data: "logged out successfully",
  });
});
const getUserProfile = catchAsync(async (req, res) => {
  const { email } = req.query;
  const userEmail = email as string;
  const result = await userServices.getUserProfileDB(userEmail);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "access user profile succssfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getUserProfile,
  userLogout,
};
