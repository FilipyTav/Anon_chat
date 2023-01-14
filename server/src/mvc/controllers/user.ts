import { Request, Response, NextFunction } from "express";
import {
    body,
    Result,
    ValidationError,
    validationResult,
} from "express-validator";
import User from "../models/User";

const index = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    res.redirect("/boards");
};

const change_membership = [
    // Validate and sanitize fieldsj
    body("secret", "Secret must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    // Process request
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<any, Record<string, any>> | undefined> => {
        const errors: Result<ValidationError> = validationResult(req);

        const { secret } = req.body;

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        // Property username does not exist on type User
        // dunno how to fix it
        const user: any = req.user;

        try {
            // Property '_id' does not exist on type '(Document<unknown, any, UserInterface> &
            // UserInterface & { _id: ObjectId; })[]'
            const result: any = await User.find({ username: user?.username });

            const { _id } = result;

            let status = "";

            switch (secret) {
                case "fsitbpe":
                    status = "member";
                    break;

                case "irrlhattatb":
                    status = "admin";
                    break;

                default:
                    return res.status(401).json({
                        success: false,
                        msg: "That is not one of the secret codes",
                    });
            }

            await User.findByIdAndUpdate(
                _id,
                { membership_status: status },
                {}
            );

            return res.status(200).json({
                success: true,
                msg: `Congratulations! Your status is now ${status}`,
            });
        } catch (err) {
            next(err);
        }
    },
];
export { index, change_membership };
