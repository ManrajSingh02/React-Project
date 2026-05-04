import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { getDashboard } from "../controllers/userController.js";

const router = express.Router();

router.get("/dashboard", verifyToken, getDashboard);

export default router;