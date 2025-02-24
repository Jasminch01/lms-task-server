import httpStatus from "http-status";
import AppError from "../Error/AppError";
import Module from "../Models/module.model";
import { Tmodule } from "../type";
import Lecture from "../Models/lecture.modal";

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

export const moduleServices = {
  createModuleDB,
  getModulesDB,
  getModulesWithCourseIdDB,
};
