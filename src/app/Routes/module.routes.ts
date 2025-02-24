import { Router } from "express";
import { moduleControllers } from "../Controllers/module.controller";
import { auth, currentUser } from "../middlewares/auth";

const router = Router();

router.post("/modules/create", auth("admin"), moduleControllers.createModule);
router.get("/modules", currentUser(), moduleControllers.getModules);
router.get("/modules/:id", currentUser(), moduleControllers.getModulesCourseId);
router.put("/modules/:id", auth("admin"), moduleControllers.moduleUpdate);
router.delete("/modules/:id", auth("admin"), moduleControllers.moduledelete);
export const moduleRouter = router;
