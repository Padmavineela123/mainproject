import express from "express";
import {
  signup,
  login,
  updateProfile,
  resetPassword,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import User from "../models/User.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", resetPassword);

router.get("/me", authMiddleware, async (req, res) => {
  // The JWT only contains id/role. Fetch the current user so
  // name and email always stay synchronized with the logged-in account.
  try {
    const user = await User.findById(req.user.id).select(
      "_id name email role"
    ).lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      message: "Authentication successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(500).json({
      message: "Unable to load user",
    });
  }
});

router.put("/profile", authMiddleware, updateProfile);

export default router;
