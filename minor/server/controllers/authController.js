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

    const normalizedEmail = String(email).trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    // Run existing user check and password hashing concurrently
    // Using 8 rounds for bcryptjs reduces CPU hashing time by ~75% while maintaining strong security
    const [existingUser, hashedPassword] = await Promise.all([
      User.findOne({ email: normalizedEmail }).select("_id").lean(),
      bcrypt.hash(password, 8),
    ]);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Generate token immediately so client can auto-login without an extra round-trip
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

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

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

    const normalizedEmail = String(email).trim().toLowerCase();

    // Select only the fields needed for authentication
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("_id name email password role");

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

    // Generate JWT token
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

    // Record lastLoginAt in the background without blocking HTTP response
    User.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date() } }
    ).catch((err) => console.error("Error updating lastLoginAt:", err));

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

// =====================================
// FORGOT / RESET PASSWORD
// =====================================
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body || {};

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    if (String(newPassword).length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select("_id");

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email address",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

    return res.status(200).json({
      message: "Password reset successfully! You can now login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      message: "Server error resetting password",
    });
  }
};

