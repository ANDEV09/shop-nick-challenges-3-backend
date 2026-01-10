import gameCategoryRepository from "~/repositories/game-category.repository";
import { CreateGameCategoryRequestBody } from "~/models/requests/game-category.request";

class GameCategoryService {
    public create = async (data: CreateGameCategoryRequestBody) => {
        const { name, status } = data;

        return await gameCategoryRepository.create({ name, status, slug: "" });
    };

    public getAll = async () => {
        const result = await gameCategoryRepository.getAll();

        return result;
    };
}

const gameCategoryService = new GameCategoryService();
export default gameCategoryService;
