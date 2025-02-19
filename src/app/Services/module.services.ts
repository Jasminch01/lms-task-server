import httpStatus from "http-status";
import AppError from "../Error/AppError";
import Module from "../Models/module.model";
import { Tmodule } from "../type";

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
export const moduleServices = {
  createModuleDB,
  getModulesDB,
};
