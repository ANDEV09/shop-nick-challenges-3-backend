import { Router } from "express";
import * as gameAccountController from "~/controllers/game-account.controllers";
import { adminCreateGameAccount } from "~/controllers/game-account.controllers";
import {
    deleteGameAccountSchema,
    editGameAccountSchema,
    gameAccountSchema,
    getGameAccountsSchema,
    getOneAccountSchema,
} from "~/models/rules/game-account.rules";

import { validate } from "~/utils/validation";

const gameAccountRouter = Router();

gameAccountRouter.post(
    "/:id/account",

    validate(gameAccountSchema),
    gameAccountController.createGameAccount,
);

gameAccountRouter.post("/:id/admin-account", validate(gameAccountSchema), gameAccountController.adminCreateGameAccount);

gameAccountRouter.put("/account-detail/:id", validate(editGameAccountSchema), gameAccountController.editGameAccount);

gameAccountRouter.delete(
    "/account/:id",

    validate(deleteGameAccountSchema),
    gameAccountController.deleteGameAccount,
);

gameAccountRouter.get("/accounts/:groupId", validate(getGameAccountsSchema), gameAccountController.getGameAccounts);

// get one account
gameAccountRouter.get("/detail/:id", validate(getOneAccountSchema), gameAccountController.getAccountDetail);

export default gameAccountRouter;
