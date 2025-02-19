import { moduleServices } from "../Services/module.services";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const createModule = catchAsync(async (req, res) => {
  const module = req.body;
  const result = await moduleServices.createModuleDB(module);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "module created successful",
  });
});

const getModules = catchAsync(async (req, res) => {
  const result = await moduleServices.getModulesDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "modules retrives successfully",
  });
});

export const moduleControllers = {
  createModule,
  getModules,
};
