import { Router } from "express";
import { DepositController } from "../controllers/deposit.controller";
import { auth } from "~/middlewares/auth.middlewares";

const router = Router();

router.get("/history/:userId", auth, DepositController.getDepositHistoryByUserId);

export default router;
