import { Request, Response, NextFunction } from "express";

import Board from "../models/Board";

const index = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    res.redirect("/boards");
};

const menu = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const boards = await Board.find()
            .populate({
                path: "messages",
                options: { limit: 5, sort: { createAt: 1 } },
                populate: { path: "author" },
            })
            .sort({ name: 1 });

        res.status(200).json(boards);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
};

const get_user = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(req.user);
};

export { index, menu, get_user };
