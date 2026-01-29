import prisma from "../configs/prisma";

class DepositRepository {
    async findDepositLogById(transactionId: string) {
        return prisma.bankDeposits.findUnique({ where: { transactionId } });
    }

    async getDepositLogsByUserId(userId: string) {
        return prisma.bankDeposits.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    create = async (data: any) => {
        const result = await prisma.bankDeposits.create({
            data,
        });
        return result;
    };
}

const depositRepository = new DepositRepository();
export default depositRepository;
