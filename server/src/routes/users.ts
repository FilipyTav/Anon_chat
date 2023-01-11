import express, { NextFunction, Request, Response, Router } from "express";

import * as users_controller from "../mvc/controllers/users";

const router: Router = express.Router();

router.get("/", users_controller.index);

router.post("/create", users_controller.create_post);

router.post("/login", users_controller.login_post);

export default router;
