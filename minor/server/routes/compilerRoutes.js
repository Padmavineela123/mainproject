import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { runCodingCode } from "../controllers/compilerController.js";

const router = express.Router();

router.post("/run", authMiddleware, runCodingCode);

export default router;
