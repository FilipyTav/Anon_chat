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

const index = async (req: Request, res: Response, next: NextFunction) => {
    const boards = await Board.find();

    res.status(200).json({ success: true, data: boards });
};

export { index };
