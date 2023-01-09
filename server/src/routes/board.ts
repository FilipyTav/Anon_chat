import express, { NextFunction, Request, Response, Router } from "express";

import * as board_controller from "../mvc/controllers/board";

const router: Router = express.Router();

router.get("/:name", board_controller.board_detail);

export default router;
