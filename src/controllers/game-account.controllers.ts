import { NextFunction, ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { CreateGameAccountRequestBody, GetGameAccountsParams } from "~/models/requests/game-account.request";
import gameAccountService from "~/services/game-account.service";

export const createGameAccount = async (
    req: Request<ParamsDictionary, any, CreateGameAccountRequestBody>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const groupId = req.params.id;
        const result = await gameAccountService.create(groupId, req.body);

        return res.status(HTTP_STATUS.CREATED).json({
            message: "Thêm account thành công!",
            result,
        });
    } catch (error) {
        return next(error);
    }
};

export const getGameAccounts = async (req: Request<GetGameAccountsParams>, res: Response, next: NextFunction) => {
    try {
        const groupId = req.params.groupId;

        // Parse query params manually vì Express req.query luôn là string
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 10;

        const result = await gameAccountService.getAccounts(groupId, page, limit);

        return res.status(HTTP_STATUS.OK).json({
            message: "Lấy danh sách accounts thành công!",
            result,
        });
    } catch (error) {
        return next(error);
    }
};

export const getAccountDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accountId = req.params.id;
        const result = await gameAccountService.getAccountDetail(accountId);

        return res.status(HTTP_STATUS.OK).json({
            message: "Lấy chi tiết tài khoản thành công!",
            result,
        });
    } catch (error) {
        return next(error);
    }
};
