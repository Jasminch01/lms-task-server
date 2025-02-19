import Module from "../Models/module.model";
import { Tmodule } from "../type";

const createModuleDB = async (module: Tmodule) => {
  const newModule = module;

  const result = Module.create(newModule);
  return result;
};

export const moduleServices = {
  createModuleDB,
};
