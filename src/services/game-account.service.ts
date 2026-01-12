import { HTTP_STATUS } from "~/constants/httpStatus";
import { ErrorWithStatus } from "~/models/Error";
import { CreateGameAccountRequestBody } from "~/models/requests/game-account.request";
import gameAccountRepository from "~/repositories/game-account.repository";

class GameAccountService {
    public create = async (id: string, data: CreateGameAccountRequestBody) => {
        const gameGroupExisted = await gameAccountRepository.findByGroupId(id);
        if (!gameGroupExisted) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Group này không tồn tại trong hệ thống!",
            });
        }

        return await gameAccountRepository.create(id, data);
    };

    public getAccounts = async (groupId: string, page?: number, limit?: number) => {
        // 1. Kiểm tra group có tồn tại không
        const groupExists = await gameAccountRepository.findByGroupId(groupId);
        if (!groupExists) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Group không tồn tại!",
            });
        }

        return await gameAccountRepository.getAllByGroupId({ groupId, page, limit });
    };

    getAccountDetail = async (accountId: string) => {
        const account = await gameAccountRepository.getAccountDetail(accountId);

        if (!account) {
            throw new ErrorWithStatus({
                message: "Tài khoản không tồn tại",
                status: HTTP_STATUS.NOT_FOUND,
            });
        }

        return account;
    };
}

const gameAccountService = new GameAccountService();
export default gameAccountService;
