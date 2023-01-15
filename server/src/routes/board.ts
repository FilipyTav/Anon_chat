import express, { Router } from "express";

import * as board_controller from "../mvc/controllers/board";

const router: Router = express.Router();

router.get("/:name", board_controller.board_detail);

router.post("/:name/messages/create", board_controller.create_message);

router.post("/:name/messages/:id/delete", board_controller.delete_message);

export default router;
