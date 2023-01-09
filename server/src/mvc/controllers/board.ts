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
import Message from "../models/Message";

// I've have been trying, for hours, to fix this,
// but it does not work if i dont call Message here
// problem in populate("messages")
Message;

interface ResponseError extends Error {
    status?: number;
}

const index = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    res.status(404);
};

const board_detail = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name } = req.params;
        const board = await Board.find({ name }).populate("messages");
        console.log(board);

        if (board.length === 0) throw "No board was found";

        res.status(200).json(board);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
};

export { index, board_detail };
