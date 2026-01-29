import depositRepository from "../repositories/deposit.repository";
import userRespository from "~/repositories/user.repository";

import { HTTP_STATUS } from "~/constants/httpStatus";
import { ErrorWithStatus } from "~/models/Error";

export class DepositService {
    public create = async (transaction: any) => {
        const match = transaction.transaction_content.match(/Naptien (\w+)/i);
        if (!match) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.BAD_REQUEST,
                message: "Nội dung chuyển khoản không hợp lệ!",
            });
        }
        const username = match[1];

        const user = await userRespository.findByUsername(username);
        if (!user) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.NOT_FOUND,
                message: "Tài khoản không tồn tại!",
            });
        }

        const existed = await depositRepository.findDepositLogById(transaction.id);
        if (existed) {
            throw new ErrorWithStatus({
                status: HTTP_STATUS.CONFLICT,
                message: "Giao dịch này đã được xử lý!",
            });
        }

        await userRespository.updateUserBalance(user.id, Number(transaction.amount_in));

        const result = await depositRepository.create({
            transactionId: transaction.id,
            userId: user.id,
            amount: Number(transaction.amount_in),
            balanceBefore: user.balance,
            balanceAfter: user.balance + Number(transaction.amount_in),
            note: transaction.transaction_content,
        });
        return result;
    };

    public getDepositHistoryByUserId = async (userId: string) => {
        return depositRepository.getDepositLogsByUserId(userId);
    };
}
