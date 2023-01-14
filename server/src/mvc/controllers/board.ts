import { NextFunction, Request, Response } from "express";

import Board from "../models/Board";
import Message from "../models/Message";
import User from "../models/User";

// I've have been trying, for hours, to fix this,
// but it does not work if i dont call Message here
// problem in populate()
Message;
User;

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

        // Gets the board and the messages, the most recent first
        const board = await Board.find({ name }).populate({
            path: "messages",
            populate: {
                path: "author",
            },
            options: { sort: { createAt: 1 } },
        });

        if (board.length === 0) throw "No board was found";

        const selected = board[0];

        res.status(200).json(selected);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
};

const create_message = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    res.status(404);
};

export { index, board_detail, create_message };
