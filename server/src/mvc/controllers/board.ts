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

const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boards = await Board.find().populate("messages");

        res.status(200).json({ success: true, data: boards });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, data: err });
    }
};

export { index };
