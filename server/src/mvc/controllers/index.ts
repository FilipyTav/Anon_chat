import { Request, Response, NextFunction } from "express";
import async from "async";
import {
    body,
    ValidationError,
    Result,
    validationResult,
} from "express-validator";
import mongoose, { CallbackError } from "mongoose";

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
        const boards = await Board.find().populate({
            path: "messages",
            options: { limit: 5, sort: { createAt: 1 } },
            populate: { path: "author" },
        });

        res.status(200).json(boards);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
};

export { index, menu };
