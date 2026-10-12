import express from "express";

import {
  submitTest,
  saveTestResult,
  getMyResults,
  submitHRInterview,
} from "../controllers/testController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Submit normal test
router.post(
  "/submit",
  authMiddleware,
  submitTest
);


// Save manually calculated result
router.post(
  "/result",
  authMiddleware,
  saveTestResult
);


// Get logged-in user's history
router.get(
  "/history",
  authMiddleware,
  getMyResults
);


// Submit HR interview
router.post(
  "/hr-submit",
  authMiddleware,
  submitHRInterview
);


export default router;