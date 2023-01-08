import express, { NextFunction, Request, Response, Router } from "express";

import * as board_controller from "../mvc/controllers/board";

const router: Router = express.Router();

router.get("/", board_controller.index);

export default router;
