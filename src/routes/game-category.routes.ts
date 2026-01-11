import { Router } from "express";
import * as gameCategoryController from "~/controllers/game-category.controllers";
import { editGameCategorySchema, gameCategorySchema } from "~/models/rules/game-category.rules";
import { validate } from "~/utils/validation";

const gameCategoryRouter = Router();

gameCategoryRouter.post("/", validate(gameCategorySchema), gameCategoryController.createGameCategory);

gameCategoryRouter.put("/:id", validate(editGameCategorySchema), gameCategoryController.editGameCategory);

//view
gameCategoryRouter.get("/", gameCategoryController.getAllGameCategories);

export default gameCategoryRouter;
