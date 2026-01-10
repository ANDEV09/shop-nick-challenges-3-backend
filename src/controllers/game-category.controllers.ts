import { NextFunction, ParamsDictionary } from "express-serve-static-core";
import { Request, Response } from "express";
import { CreateGameCategoryRequestBody } from "~/models/requests/game-category.request";
import gameCategoryService from "~/services/game-category.service";
import { HTTP_STATUS } from "~/constants/httpStatus";

export const createGameCategory = async (
    req: Request<ParamsDictionary, any, CreateGameCategoryRequestBody>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await gameCategoryService.create(req.body);
        return res.status(HTTP_STATUS.CREATED).json({
            message: "Tạo danh mục game thành công!",
            result,
        });
    } catch (error) {
        return next(error);
    }
};

export const getAllGameCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await gameCategoryService.getAll();
        return res.status(HTTP_STATUS.OK).json({
            message: "Lấy danh sách danh mục thành công",
            result,
        });
    } catch (error) {
        return next(error);
    }
};
