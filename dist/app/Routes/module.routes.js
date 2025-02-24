"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRouter = void 0;
const express_1 = require("express");
const module_controller_1 = require("../Controllers/module.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/modules/create", (0, auth_1.auth)('admin'), module_controller_1.moduleControllers.createModule); //task : have authenticate user is admin
router.get("/modules", (0, auth_1.currentUser)(), module_controller_1.moduleControllers.getModules);
router.get("/modules/:id", (0, auth_1.currentUser)(), module_controller_1.moduleControllers.getModulesCourseId);
exports.moduleRouter = router;
