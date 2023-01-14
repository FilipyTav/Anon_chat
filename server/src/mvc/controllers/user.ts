import { Request, Response, NextFunction } from "express";

const index = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    res.redirect("/boards");
};

const change_membership = [
    (req: Request, res: Response, next: NextFunction): void => {
        res.redirect("/boards");
    },
];
export { index, change_membership };
