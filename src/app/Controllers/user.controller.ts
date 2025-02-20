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

const userSignIn = catchAsync(async (req, res) => {
  const userCrediential = req.body;
  const { user, token } = await userServices.userSignIn(userCrediential);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user sign in successfully",
    data: user,
    token: token,
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  const userEmail = req.body;
  const result = await userServices.getUserProfileDB(userEmail);
  sendResponse(res, {
    success : true,
    statusCode : 200,
    message : "access user profile succssfully",
    data : result,
  })
})

export const userController = {
  createUser,
  userSignIn,
  getUserProfile,
};
