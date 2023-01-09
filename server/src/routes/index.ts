import express, { NextFunction, Request, Response, Router } from "express";

import * as index_controller from "../mvc/controllers/index";

const router: Router = express.Router();

router.get("/", index_controller.index);

router.get("/boards", index_controller.menu);

export default router;
