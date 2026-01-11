import { HTTP_STATUS } from "~/constants/httpStatus";
import { ErrorWithStatus } from "~/models/Error";
import gameGroupRepository from "~/repositories/game-group.repository";
import { CreateGameGroupRequestBody } from "~/models/requests/game-group.request";

class GameGroupService {
    public create = async (data: CreateGameGroupRequestBody) => {
        const { categoryId, title, thumbnail, status } = data;

        const gameCategoryExisted = await gameGroupRepository.findByCategoryId(categoryId);
        if (!gameCategoryExisted) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Danh mục này không tồn tại trong hệ thống!",
            });
        }

        return await gameGroupRepository.create({ categoryId, title, thumbnail, status, slug: "" });
    };

    public getGameGroups = async (categoryId: string) => {
        const categoryExisted = await gameGroupRepository.findByCategoryId(categoryId);
        if (!categoryExisted) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Danh mục này không tồn tại trong hệ thống!",
            });
        }

        return await gameGroupRepository.getGameGroups({ categoryId });
    };
}

const gameGroupService = new GameGroupService();

export default gameGroupService;
