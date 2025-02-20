import { Router } from "express";
import { moduleControllers } from "../Controllers/module.controller";
import { auth, currentUser } from "../middlewares/auth";

const router = Router();

router.post("/modules/create", auth('admin'), moduleControllers.createModule); //task : have authenticate user is admin
router.get("/modules", currentUser(), moduleControllers.getModules);
export const moduleRouter = router;
