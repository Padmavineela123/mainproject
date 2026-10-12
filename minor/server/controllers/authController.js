import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// =====================================
// SIGNUP
// =====================================
export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = req.body || {};

    // Check required fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Password policy (server-side enforcement)
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters",
      });
    }

    // Email format check (double-check before DB validator hits)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Server error during signup",
    });
  }
};

// =====================================
// LOGIN
// =====================================
export const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Record the latest successful login for admin usage statistics.
    user.lastLoginAt = new Date();
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role || "user",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error during login",
    });
  }
};

// =====================================
// UPDATE PROFILE
// =====================================
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedName = String(name).trim();

    if (!normalizedName || !normalizedEmail) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: req.user.id },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "That email is already in use",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: normalizedName,
        email: normalizedEmail,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("name email role");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);

    return res.status(500).json({
      message: "Unable to update profile",
    });
  }
};
