import { Router } from "express";
import * as gameAccountController from "~/controllers/game-account.controllers";
import {
    deleteGameAccountSchema,
    editGameAccountSchema,
    gameAccountSchema,
    getGameAccountsSchema,
    getOneAccountSchema,
} from "~/models/rules/game-account.rules";

import { validate } from "~/utils/validation";
import { auth } from "~/middlewares/auth.middlewares";
import { checkAdmin } from "~/middlewares/checkAdmin.middlewares";

const gameAccountRouter = Router();

// Lấy danh sách tài khoản đã mua của user (phải trước /:groupId)
gameAccountRouter.get("/my-purchased", auth, gameAccountController.getMyPurchasedAccounts);

// Lấy danh sách tài khoản đã đăng bán của seller
gameAccountRouter.get("/my-selling", auth, gameAccountController.getMySellerAccounts);

// get danh sách account theo group role user
gameAccountRouter.get("/:groupId", validate(getGameAccountsSchema), gameAccountController.getGameAccounts);

// mua tài khoản
gameAccountRouter.post("/:id/purchase", auth, gameAccountController.purchaseGameAccount);

// get one account
gameAccountRouter.get("/detail/:id", validate(getOneAccountSchema), gameAccountController.getAccountDetail);

// đăng bán account cho user (status: 0 - chờ duyệt)
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

// Admin: Lấy chi tiết 1 account đầy đủ thông tin
gameAccountRouter.get("/admin/account/:id", checkAdmin, gameAccountController.getAccountDetailAdmin);

// get danh sách acc đã bán admin
gameAccountRouter.get("/admin/sold-history", checkAdmin, gameAccountController.getSoldAccountsHistoryAdmin);

export default gameAccountRouter;
