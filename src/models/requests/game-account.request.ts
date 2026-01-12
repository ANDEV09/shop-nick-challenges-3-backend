import z from "zod/v3";
import { gameAccountSchema, getGameAccountsSchema } from "~/models/rules/game-account.rules";

export type CreateGameAccountRequestBody = z.infer<typeof gameAccountSchema>["body"];

export type GetGameAccountsParams = z.infer<typeof getGameAccountsSchema>["params"];
