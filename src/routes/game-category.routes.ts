import { Router } from "express";
import * as gameCategoryController from "~/controllers/game-category.controllers";
import { gameCategorySchema } from "~/models/rules/game-category.rules";
import { validate } from "~/utils/validation";

const gameCategoryRouter = Router();

gameCategoryRouter.post("/", validate(gameCategorySchema), gameCategoryController.createGameCategory);
//view
gameCategoryRouter.get("/", gameCategoryController.getAllGameCategories);

export default gameCategoryRouter;
