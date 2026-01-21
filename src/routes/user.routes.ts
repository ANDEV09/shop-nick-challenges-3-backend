import { Router } from "express";
import { getProfile } from "~/controllers/users.controllers";
import { auth } from "~/middlewares/auth.middlewares";

const userRouter = Router();

userRouter.get("/profile", auth, getProfile);
export default userRouter;
