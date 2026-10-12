import express from "express";
import {
  adminLogin,
  getAdminDashboard,
} from "../controllers/adminController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get(
  "/dashboard",
  adminMiddleware,
  getAdminDashboard
);

export default router;
