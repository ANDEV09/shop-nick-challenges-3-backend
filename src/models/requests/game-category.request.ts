import z from "zod/v3";
import { gameCategorySchema } from "~/models/rules/game-category.rules";

export type CreateGameCategoryRequestBody = z.infer<typeof gameCategorySchema>["body"];
