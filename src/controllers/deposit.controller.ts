import { Request, Response } from "express";
import { DepositService } from "../services/deposit.service";

const depositService = new DepositService();

export class DepositController {
    static async manualProcessDeposit(req: Request, res: Response) {
        const transaction = req.body;
        try {
            const result = await depositService.create(transaction);
            if (result) {
                res.json({ success: true, message: "Tiền gửi đã được xử lý." });
            } else {
                res.status(400).json({ success: false, message: "Tiền gửi không được xử lý." });
            }
        } catch (err) {
            res.status(500).json({ success: false, message: "Lỗi máy chủ", error: err });
        }
    }

    static async getDepositHistoryByUserId(req: Request, res: Response) {
        const { userId } = req.params;
        try {
            const history = await depositService.getDepositHistoryByUserId(userId);
            res.json({ success: true, data: history });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Lỗi máy chủ",
                error: err instanceof Error ? err.message : err,
            });
        }
    }
}
