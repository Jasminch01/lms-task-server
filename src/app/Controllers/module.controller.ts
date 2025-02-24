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

const moduleUpdate = catchAsync(async (req, res) => {
  const { editedTitle } = req.body;
  const { id } = req.params;
  const result = await moduleServices.moduleUpdateDB(id, editedTitle);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "module updated successfully",
  });
});

const moduledelete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await moduleServices.deleteModule(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "module deleted successfully",
  });
});

const getModulesCourseId = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const courseId = id as string;
  const result = await moduleServices.getModulesWithCourseIdDB(courseId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "modules are retrive successfully",
  });
});

export const moduleControllers = {
  createModule,
  getModules,
  getModulesCourseId,
  moduleUpdate,
  moduledelete,
};
