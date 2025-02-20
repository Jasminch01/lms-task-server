import { Router } from "express";
import { userController } from "../Controllers/user.controller";

const router = Router();
router.post("/admin/signup", userController.createUser);
router.post("/admin/signin", userController.adminSignIn);

export const adminRouter = router;
