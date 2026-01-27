import { Router } from "express";
import * as gameAccountController from "~/controllers/game-account.controllers";
import {
    deleteGameAccountSchema,
    editGameAccountSchema,
    gameAccountSchema,
    getGameAccountsSchema,
    getOneAccountSchema,
    adminUpdateStatusAccountSchema,
} from "~/models/rules/game-account.rules";

import { validate } from "~/utils/validation";
import { auth } from "~/middlewares/auth.middlewares";
import { checkAdmin } from "~/middlewares/checkAdmin.middlewares";

const gameAccountRouter = Router();

gameAccountRouter.get("/admin/pending-accounts", checkAdmin, gameAccountController.getPendingAccountsAdmin);
gameAccountRouter.get("/admin/account/:id", checkAdmin, gameAccountController.getAccountDetailAdmin);
gameAccountRouter.get("/admin/sold-history", checkAdmin, gameAccountController.getSoldAccountsHistoryAdmin);
gameAccountRouter.put(
    "/admin/pending-account/:id/status",
    checkAdmin,
    validate(adminUpdateStatusAccountSchema),
    gameAccountController.adminUpdateStatusAccount,
);

gameAccountRouter.get("/my-purchased", auth, gameAccountController.getMyPurchasedAccounts);
gameAccountRouter.get("/my-selling", auth, gameAccountController.getMySellerAccounts);
gameAccountRouter.get("/detail/:id", validate(getOneAccountSchema), gameAccountController.getAccountDetail);
gameAccountRouter.post("/:id/account", auth, validate(gameAccountSchema), gameAccountController.createGameAccount);
gameAccountRouter.post(
    "/:id/admin-account",
    checkAdmin,
    validate(gameAccountSchema),
    gameAccountController.adminCreateGameAccount,
);
gameAccountRouter.put(
    "/account-detail/:id",
    checkAdmin,
    validate(editGameAccountSchema),
    gameAccountController.editGameAccount,
);
gameAccountRouter.delete(
    "/account/:id",
    checkAdmin,
    validate(deleteGameAccountSchema),
    gameAccountController.deleteGameAccount,
);
gameAccountRouter.post("/:id/purchase", auth, gameAccountController.purchaseGameAccount);

gameAccountRouter.get("/:groupId", validate(getGameAccountsSchema), gameAccountController.getGameAccounts);

export default gameAccountRouter;
