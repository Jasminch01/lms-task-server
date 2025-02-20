import { Router } from "express";
import { moduleControllers } from "../Controllers/module.controller";
import { currentUser } from "../middlewares/auth";

const router = Router();

router.post("/modules/create", currentUser(), moduleControllers.createModule); //task : have authenticate user is admin
router.get("/modules", moduleControllers.getModules);
export const moduleRouter = router;
