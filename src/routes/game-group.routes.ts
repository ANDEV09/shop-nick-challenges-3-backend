import { Router } from "express";
import * as gameGroupController from "~/controllers/game-group.controllers";
import { gameGroupSchema, getGameGroupsByCategorySchema } from "~/models/rules/game-group.rules";
import { validate } from "~/utils/validation";

const gameGroupRouter = Router();

gameGroupRouter.post("/", validate(gameGroupSchema), gameGroupController.createGameGroup);

gameGroupRouter.get(
    "/category/:categoryId",
    validate(getGameGroupsByCategorySchema),
    gameGroupController.getGameGroups,
);

export default gameGroupRouter;