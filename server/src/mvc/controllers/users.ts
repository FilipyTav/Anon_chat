import { Request, Response, NextFunction } from "express";
import {
    body,
    ValidationError,
    Result,
    validationResult,
} from "express-validator";
import passport from "passport";

import User from "../models/User";

const index = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    res.redirect("/boards");
};

const create_post = [
    // Validate and sanitize fieldsj
    body("username", "Username must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("password", "Password must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("confirm_password")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(
                    "Password confirmation does not match password"
                );
            }

            // Indicates the success of this synchronous custom validator
            return true;
        })
        .trim()
        .isLength({ min: 1 })
        .escape(),

    // Process request
    async (req: Request, res: Response, next: NextFunction) => {
        const errors: Result<ValidationError> = validationResult(req);

        const { username, password, confirm_password } = req.body;

        const db_user = await User.find({ username });

        if (db_user.length > 0)
            return res.status(400).json({ errors: ["Username already taken"] });

        // TODO: hash passwords

        // Create new user obj with the validated and sanitized values
        const user = new User({ username, password });

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            // Data is valid, save user
            const result = await user.save();

            // Successful: redirect to new category record.
            res.redirect("/boards");
        } catch (err) {
            return next(err);
        }
    },
];

// const login_post = passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/",
// });

const login_post = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    passport.authenticate("local", function (err, user, info) {
        if (err) return next(err); // will generate a 500 error

        const messages: string[] = [];

        if (info) messages.push(info.message);

        // Generate a JSON response reflecting authentication status
        if (messages.length)
            return res.status(401).json({
                success: false,
                errors: messages,
            });

        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************
        req.login(user, (login_err: Error) => {
            if (login_err) return next(login_err);

            return res.status(200).json({
                success: true,
                message: "Authentication succeeded",
            });
        });
    })(req, res, next);
};

export { index, create_post, login_post };
