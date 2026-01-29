import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/user.routes";
import cors from "cors";
import "./cronjobs/bank";

import "dotenv/config"; // thêm cái này để có thể sử dụng biến môi trường (nếu k sẽ là underfined), import ở file này thì tất cả file con đều được áp dụng
import { defaultErrorHandler } from "./middlewares/error.middlewares";
import { defaultSuccessHandler } from "./middlewares/success.middlewares";
import authRouter from "./routes/auth.routes";
import redisClient from "./configs/redis";
import { limiterMiddleware } from "./middlewares/common.middleware";
import gameCategoryRouter from "~/routes/game-category.routes";
import gameGroupRouter from "~/routes/game-group.routes";
import gameAccountRouter from "~/routes/game-account.routes";
import depositRouter from "./routes/deposit.routes";
const app = express();
const PORT = process.env.PORT || 8000;
const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true, // Allow cookies/authorization headers to be sent cross-origin
};

app.use(cors(corsOptions));
// parse body request
app.use(express.json());
app.use(limiterMiddleware);
redisClient.connect();
// sau khi đã định nghĩa routing với biến "router" thì phải sử dụng app.use( .... ) để chạy các routing đã cài trong "router"
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/game-categories", gameCategoryRouter);
app.use("/game-groups", gameGroupRouter);
app.use("/game-accounts", gameAccountRouter);
app.use("/deposits", depositRouter);

app.use(defaultErrorHandler);
app.use(defaultSuccessHandler);

app.listen(PORT, () => {
    console.log(`Server successfully launched on PORT ${PORT}!`);
});
