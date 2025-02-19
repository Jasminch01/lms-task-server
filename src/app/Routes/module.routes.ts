import { Router } from "express";
import { moduleControllers } from "../Controllers/module.controller";

const router = Router();

router.post("/module/create", moduleControllers.createModule); //task : have authenticate user is admin

export const moduleRouter = router;
