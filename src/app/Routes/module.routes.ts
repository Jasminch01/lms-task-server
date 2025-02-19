import { Router } from "express";
import { moduleControllers } from "../Controllers/module.controller";

const router = Router();

router.post("/modules/create", moduleControllers.createModule); //task : have authenticate user is admin
router.get("/modules", moduleControllers.getModules);
export const moduleRouter = router;
