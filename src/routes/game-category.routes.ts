import { Router } from "express";
import * as gameCategoryController from "~/controllers/game-category.controllers";
import { checkAdmin } from "~/middlewares/checkAdmin.middlewares";
import {
    deleteGameCategorySchema,
    editGameCategorySchema,
    gameCategorySchema,
} from "~/models/rules/game-category.rules";
import { validate } from "~/utils/validation";

const gameCategoryRouter = Router();

//view users
gameCategoryRouter.get("/", gameCategoryController.getAllGameCategories);

gameCategoryRouter.post("/", checkAdmin, validate(gameCategorySchema), gameCategoryController.createGameCategory);

gameCategoryRouter.put("/:id", checkAdmin, validate(editGameCategorySchema), gameCategoryController.editGameCategory);

gameCategoryRouter.delete(
    "/:id",
    checkAdmin,
    validate(deleteGameCategorySchema),
    gameCategoryController.deleteGameCategory,
);

// Admin view all categories (status 0 và 1)
gameCategoryRouter.get("/admin/game-categories", checkAdmin, gameCategoryController.getAllGameCategorysAdmin);
export default gameCategoryRouter;