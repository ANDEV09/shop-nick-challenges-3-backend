import { HTTP_STATUS } from "~/constants/httpStatus";
import { ErrorWithStatus } from "~/models/Error";
import { CreateGameAccountRequestBody, EditGameAccountRequestBody } from "~/models/requests/game-account.request";
import gameAccountRepository from "~/repositories/game-account.repository";
import userRespository from "~/repositories/user.repository";

class GameAccountService {
    public create = async (id: string, userId: string, data: CreateGameAccountRequestBody) => {
        const gameGroupExisted = await gameAccountRepository.findByGroupId(id);
        if (!gameGroupExisted) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Group này không tồn tại trong hệ thống!",
            });
        }

        return await gameAccountRepository.create(id, userId, data);
    };

    public adminCreate = async (id: string, data: CreateGameAccountRequestBody) => {
        const gameGroupExisted = await gameAccountRepository.findByGroupId(id);
        if (!gameGroupExisted) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Group này không tồn tại trong hệ thống!",
            });
        }
        return await gameAccountRepository.adminCreate(id, data);
    };

    public edit = async (id: string, data: EditGameAccountRequestBody) => {
        const accountExisted = await gameAccountRepository.findByAccountId(id);
        if (!accountExisted) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Account này không tồn tại trong hệ thống!",
            });
        }

        return await gameAccountRepository.edit(id, data);
    };

    public delete = async (id: string) => {
        const gameAccountExisted = await gameAccountRepository.findByAccountId(id);
        if (!gameAccountExisted) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Tài khoản không tồn tại trong hệ thống!",
            });
        }

        if (gameAccountExisted.status === 1) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: "Không thể xóa account đã bán!",
            });
        }

        return await gameAccountRepository.delete(id);
    };

    public getAccounts = async (groupId: string, page?: number, limit?: number) => {
        const groupExists = await gameAccountRepository.findByGroupId(groupId);
        if (!groupExists) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Group không tồn tại!",
            });
        }

        return await gameAccountRepository.getAllByGroupId({ groupId, page, limit });
    };

    purchaseAccount = async (accountId: string, userId: string) => {
        // 1. Kiểm tra account có tồn tại không
        const account = await gameAccountRepository.findByAccountId(accountId);
        if (!account) {
            throw new ErrorWithStatus({
                message: "Tài khoản không tồn tại",
                status: HTTP_STATUS.NOT_FOUND,
            });
        }

        // 2. Kiểm tra đã được mua chưa
        if (account.status === 1 || account.buyerId) {
            throw new ErrorWithStatus({
                message: "Tài khoản đã được mua",
                status: HTTP_STATUS.BAD_REQUEST,
            });
        }

        // 3. Lấy thông tin user (buyer)
        const user = await userRespository.findById(userId);
        if (!user) {
            throw new ErrorWithStatus({
                message: "User không tồn tại",
                status: HTTP_STATUS.NOT_FOUND,
            });
        }

        // 4. Kiểm tra số dư
        if (user.balance < account.price) {
            throw new ErrorWithStatus({
                message: `Số dư không đủ! Bạn cần ${account.price - user.balance} VND nữa`,
                status: HTTP_STATUS.BAD_REQUEST,
            });
        }

        // 5. Thực hiện mua (cập nhật account)
        const result = await gameAccountRepository.purchase(accountId, userId);

        // 6. Trừ tiền buyer
        await userRespository.updateBalance(userId, user.balance - account.price);

        // 7. Cộng tiền cho seller (nếu tồn tại)
        if (account.sellerId) {
            const seller = await userRespository.findById(account.sellerId);
            if (seller) {
                await userRespository.updateBalance(account.sellerId, seller.balance + account.price);
            }
        }

        return result;
    };

    getMyPurchasedAccounts = async (userId: string) => {
        return gameAccountRepository.getMyPurchasedAccounts(userId);
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

    public getAccountsAdmin = async (groupId: string, page?: number, limit?: number) => {
        const groupExists = await gameAccountRepository.findByGroupId(groupId);
        if (!groupExists) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Group không tồn tại!",
            });
        }
        return gameAccountRepository.getAllByGroupIdAdmin({ groupId, page, limit });
    };

    public getAccountDetailAdmin = async (accountId: string) => {
        const account = await gameAccountRepository.getAccountDetailAdmin(accountId);
        if (!account) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Account không tồn tại!",
            });
        }
        return account;
    };

    public getSoldAccountsHistoryAdmin = async (page?: number, limit?: number) => {
        return gameAccountRepository.getSoldAccountsHistoryAdmin({ page, limit });
    };
}

const gameAccountService = new GameAccountService();
export default gameAccountService;
