import express, { Router } from "express";

import * as index_controller from "../mvc/controllers/index";

const router: Router = express.Router();

router.get("/", index_controller.index);

router.get("/boards", index_controller.menu);

router.get("/get_user", index_controller.get_user);

export default router;
