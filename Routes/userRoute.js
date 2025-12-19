import express from "express";
import protect from "../Middleware/authMiddleware.js";
import { getUserStreak } from "../Controller/userController.js";

const userRoute = express.Router();

userRoute.get("/streak", protect, getUserStreak);

export default userRoute;
