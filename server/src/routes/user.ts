import express, { Router } from "express";

import * as user_controller from "../mvc/controllers/user";

const router: Router = express.Router();

router.get("/change_membership", user_controller.change_membership);

export default router;
