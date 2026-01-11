import { Router } from "express";
import * as gameCategoryController from "~/controllers/game-category.controllers";
import {
    deleteGameCategorySchema,
    editGameCategorySchema,
    gameCategorySchema,
} from "~/models/rules/game-category.rules";
import { validate } from "~/utils/validation";

const gameCategoryRouter = Router();

gameCategoryRouter.get("/", gameCategoryController.getAllGameCategories);

gameCategoryRouter.post("/", validate(gameCategorySchema), gameCategoryController.createGameCategory);

gameCategoryRouter.put("/:id", validate(editGameCategorySchema), gameCategoryController.editGameCategory);

gameCategoryRouter.delete("/:id", validate(deleteGameCategorySchema), gameCategoryController.deleteGameCategory);

export default gameCategoryRouter;