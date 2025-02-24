import httpStatus from "http-status";
import AppError from "../Error/AppError";
import Module from "../Models/module.model";
import { Tmodule } from "../type";
import Lecture from "../Models/lecture.modal";
import { error } from "console";

const createModuleDB = async (module: Tmodule) => {
  const newModule = module;

  const result = Module.create(newModule);
  return result;
};

const getModulesDB = async () => {
  const result = Module.find();
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "there is no modules");
  }
  return result;
};
const getModulesWithCourseIdDB = async (courseId: string) => {
  const modules = await Module.find({ courseId: courseId });

  if (!modules || modules.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Modules not found");
  }
  //lectures for each module
  const modulesWithLectures = await Promise.all(
    modules.map(async (module) => {
      const lectures = await Lecture.find({ moduleId: module._id });
      return {
        ...module.toObject(),
        lectures,
      };
    })
  );
  return modulesWithLectures;
};

const moduleUpdateDB = async (moduleId: string, updateName: string) => {
  const existModule = Module.findById(moduleId);
  if (!existModule) {
    throw new AppError(httpStatus.NOT_FOUND, "module not found");
  }
  const updatedModule = await Module.findByIdAndUpdate(
    moduleId,
    { title: updateName },
    { new: true }
  );

  if (!updatedModule) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update module"
    );
  }

  return updatedModule;
};

const deleteModule = async (moduleId: string) => {
  const existModule = Module.findById(moduleId);
  if (!existModule) {
    throw new AppError(httpStatus.NOT_FOUND, "module not found");
  }

  const deleteModule = Module.findByIdAndDelete(moduleId);
  if (!deleteModule) {
    throw new AppError(httpStatus.NOT_FOUND, "module delete failed");
  }

  return deleteModule;
};

export const moduleServices = {
  createModuleDB,
  getModulesDB,
  getModulesWithCourseIdDB,
  moduleUpdateDB,
  deleteModule,
};
