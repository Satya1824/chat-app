import express from "express";
import {
  getAllMessagesController,
  sendMessageController,
} from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, sendMessageController);

router.get("/get-mesgs/:chatId", protect, getAllMessagesController);

export default router;
