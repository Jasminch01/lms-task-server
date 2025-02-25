import { Router } from "express";
import { userController } from "../Controllers/user.controller";
import { currentUser } from "../middlewares/auth";

const router = Router();
router.post("/user/signup", userController.createUser);
// router.post("/user/signin", userController.userSignIn);
router.post("/user/logout", userController.userLogout);
router.get("/user/me", currentUser(), userController.getUserProfile);

export const userRouter = router;
