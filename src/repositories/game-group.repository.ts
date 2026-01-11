import prisma from "~/configs/prisma";
import GameGroup from "~/schemas/game-group.schema";

class GameGroupRepository {
    create = async (data: { categoryId: string; title: string; slug: string; thumbnail: string; status: number }) => {
        const result = await prisma.gameGroups.create({
            data: new GameGroup(data),
        });
        return result;
    };

    findByCategoryId = async (id: string) => {
        const result = await prisma.gameCategories.findUnique({
            where: { id },
        });
        return result;
    };

    findById = async (id: string) => {
        const result = await prisma.gameGroups.findUnique({
            where: { id },
        });
        return result;
    };

    getGameGroups = async (params: { categoryId: string }) => {
        const { categoryId } = params;
        const result = await prisma.gameGroups.findMany({
            where: {
                categoryId: categoryId,
                active: 1,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return result;
    };
}

const gameGroupRepository = new GameGroupRepository();
export default gameGroupRepository;
