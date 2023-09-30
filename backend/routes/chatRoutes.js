import express from "express";
import {
  accessChatController,
  addToGroupController,
  createGroupChatController,
  fetchChatsController,
  removeFromGroupController,
  renameGroupController,
} from "../controllers/chatControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/access-chat", protect, accessChatController);

router.get("/get-chats", protect, fetchChatsController);

router.post("/create-group", protect, createGroupChatController);

router.put("/rename-group", protect, renameGroupController);

router.put("/group-add", protect, addToGroupController);

router.put("/group-remove", protect, removeFromGroupController);

export default router;
