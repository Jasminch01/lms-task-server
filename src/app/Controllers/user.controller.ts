import { userServices } from "../Services/user.services";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await userServices.createUserDB(user);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "user created successfully",
    data: result,
  });
});

const adminSignIn = catchAsync(async (req, res) => {
  const userCrediential = req.body;
  const { user, token } = await userServices.adminSignIn(userCrediential);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "admin sign in successfully",
    data: user,
    token: token,
  });
});

export const userController = {
  createUser,
  adminSignIn,
};
