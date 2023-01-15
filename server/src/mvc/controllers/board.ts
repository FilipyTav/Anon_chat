import { NextFunction, Request, Response } from "express";
import {
    body,
    Result,
    ValidationError,
    validationResult,
} from "express-validator";
import async from "async";

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
        const board: any = await Board.find({ name }).populate({
            path: "messages",
            populate: {
                path: "author",
            },
            options: { sort: { createdAt: -1 } },
        });

        if (board.length === 0) throw "No board was found";

        const selected = board[0];

        res.status(200).json(selected);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
};

const create_message = [
    // Validates and sanitize fieldsj
    body("new_comment", "Comment must not be empty")
        .trim()
        .isLength({ min: 1 }),
    // Not escaping becuase it will be as text in the client
    // .escape(),

    // Processes request
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        const errors: Result<ValidationError> = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { new_comment } = req.body;

        console.log(new_comment);

        const user: any = req.user;

        try {
            const results: any = await async.parallel({
                user: function (callback) {
                    User.find({ username: user.username }).exec(callback);
                },
                board: function (callback) {
                    Board.find({ name: req.params.name }).exec(callback);
                },
            });

            const message = new Message({
                content: new_comment,
                author: results.user[0],
            });

            results.board[0].messages.push(message);

            await message.save();

            await results.board[0].save();

            res.status(201).json({ success: true });
        } catch (err) {
            next(err);
        }
    },
];

const delete_message = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id, name } = req.params;

    try {
        const message = await Message.findByIdAndDelete(id);

        res.status(204).json({
            success: true,
            msg: "Message deleted successfully",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            err,
        });
    }
};

export { index, board_detail, create_message, delete_message };
