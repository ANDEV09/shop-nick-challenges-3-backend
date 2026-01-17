import { Router } from "express";
import * as gameGroupController from "~/controllers/game-group.controllers";
import { checkAdmin } from "~/middlewares/checkAdmin.middlewares";
import {
    delCategoryParamsSchema,
    editGameGroupSchema,
    gameGroupSchema,
    getGameGroupsAdminSchema,
    getGameGroupsByCategorySchema,
} from "~/models/rules/game-group.rules";
import { validate } from "~/utils/validation";

const gameGroupRouter = Router();

gameGroupRouter.post("/", checkAdmin, validate(gameGroupSchema), gameGroupController.createGameGroup);

gameGroupRouter.put("/:id", checkAdmin, validate(editGameGroupSchema), gameGroupController.editGameGroup);

gameGroupRouter.delete("/:id", checkAdmin, validate(delCategoryParamsSchema), gameGroupController.deleteGameGroup);

gameGroupRouter.get("/:categoryId", validate(getGameGroupsByCategorySchema), gameGroupController.getGameGroups);

gameGroupRouter.get(
    "/admin/groups/:categoryId",
    validate(getGameGroupsAdminSchema),
    checkAdmin,
    gameGroupController.getAllGameGroupsAdmin,
);

export default gameGroupRouter;
