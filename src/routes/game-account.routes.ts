import { Router } from "express";
import * as gameAccountController from "~/controllers/game-account.controllers";
import { gameAccountSchema, getGameAccountsSchema, getOneAccountSchema } from "~/models/rules/game-account.rules";

import { validate } from "~/utils/validation";

const gameAccountRouter = Router();

gameAccountRouter.post(
    "/:id/account",

    validate(gameAccountSchema),
    gameAccountController.createGameAccount,
);

gameAccountRouter.get("/group/:groupId", validate(getGameAccountsSchema), gameAccountController.getGameAccounts);

// get one account
gameAccountRouter.get("/detail/:id", validate(getOneAccountSchema), gameAccountController.getAccountDetail);

export default gameAccountRouter;
