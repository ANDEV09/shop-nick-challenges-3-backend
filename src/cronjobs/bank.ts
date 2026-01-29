import cron from "node-cron";
import axios from "axios";
import { DepositService } from "../services/deposit.service";
const SEPAY_API_KEY = process.env.SEPAY_API_KEY;
const BASE_URL = "https://my.sepay.vn/userapi/transactions";

const headers = {
    Authorization: `Bearer ${SEPAY_API_KEY}`,
    "Content-Type": "application/json",
};

async function fetchTransactions() {
    const res = await axios.get(`${BASE_URL}/list`, { headers });
    return res.data.transactions || [];
}

const depositService = new DepositService();

async function processDeposits() {
    const transactions = await fetchTransactions();
    for (const transaction of transactions) {
        try {
            await depositService.create(transaction);
        } catch (err: any) {
            if (err?.status === 409) break;
        }
    }
}

// Chạy cron mỗi 1 phút
cron.schedule("*/1 * * * *", async () => {
    try {
        await processDeposits();
        console.log("Cronjobs đang chạy 1 phút 1 lần");
    } catch (err) {
        console.error("Lỗi cron nạp tiền:", err);
    }
});
