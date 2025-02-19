"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRouter = void 0;
const express_1 = require("express");
const module_controller_1 = require("../Controllers/module.controller");
const router = (0, express_1.Router)();
router.post("/modules/create", module_controller_1.moduleControllers.createModule); //task : have authenticate user is admin
router.get("/modules", module_controller_1.moduleControllers.getModules);
exports.moduleRouter = router;
