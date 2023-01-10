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

const create_post = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { username, password, confirm_password } = req.body;

    res.json({ status: "testing" });
};

export { index, create_post };
