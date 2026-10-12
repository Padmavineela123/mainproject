import express from "express";

import {
  generateFeedback,
} from "../controllers/aiController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================
// GENERATE AI FEEDBACK
// =====================================
router.post(
  "/feedback",
  authMiddleware,
  generateFeedback
);

export default router;