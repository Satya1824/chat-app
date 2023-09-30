import express from "express";
import {
  getAllUsers,
  loginController,
  registerController,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/", protect, getAllUsers);

export default router;
