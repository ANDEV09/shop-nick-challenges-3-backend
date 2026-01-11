import z from "zod/v3";
import { gameGroupSchema, getGameGroupsByCategorySchema } from "~/models/rules/game-group.rules";

export type CreateGameGroupRequestBody = z.infer<typeof gameGroupSchema>["body"];

export type GetGameGroupsParams = z.infer<typeof getGameGroupsByCategorySchema>["params"];
