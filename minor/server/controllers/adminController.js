import jwt from "jsonwebtoken";
import User from "../models/User.js";
import TestResult from "../models/TestResult.js";

// Admin login is intentionally separate from student login.
// Credentials come from server/.env and are never shipped to the browser.
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    const adminEmail = (process.env.ADMIN_EMAIL || "admin@aiinterviewprep.com").trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

    if (
      String(email || "").trim().toLowerCase() !==
        adminEmail.trim().toLowerCase() ||
      String(password || "") !== adminPassword
    ) {
      return res.status(401).json({
        message: "Invalid admin email or password",
      });
    }

    const token = jwt.sign(
      {
        id: "admin",
        role: "admin",
        email: adminEmail,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        email: adminEmail,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Unable to login as admin",
    });
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    const now = new Date();
    const last30Days = new Date(now);
    last30Days.setDate(last30Days.getDate() - 30);

    const last7Days = new Date(now);
    last7Days.setDate(last7Days.getDate() - 7);

    const [
      totalUsers,
      activeUsers,
      totalAttempts,
      scoreSummary,
      highestScoreSummary,
      completionSummary,
      newUsersLast7Days,
      attemptsLast7Days,
      performance,
      recentActivity,
      recentUsers,
    ] = await Promise.all([
      User.countDocuments({ role: { $ne: "admin" } }),

      User.countDocuments({
        role: { $ne: "admin" },
        lastLoginAt: { $gte: last30Days },
      }),

      TestResult.countDocuments(),

      TestResult.aggregate([
        {
          $group: {
            _id: null,
            average: { $avg: "$percentage" },
          },
        },
      ]),

      TestResult.aggregate([
        {
          $group: {
            _id: null,
            highest: { $max: "$percentage" },
          },
        },
      ]),

      TestResult.aggregate([
        {
          $group: {
            _id: null,
            average: {
              $avg: {
                $cond: [
                  { $gt: ["$totalQuestions", 0] },
                  {
                    $multiply: [
                      {
                        $divide: [
                          "$correct",
                          "$totalQuestions",
                        ],
                      },
                      100,
                    ],
                  },
                  0,
                ],
              },
            },
          },
        },
      ]),

      User.countDocuments({
        role: { $ne: "admin" },
        createdAt: { $gte: last7Days },
      }),

      TestResult.countDocuments({
        createdAt: { $gte: last7Days },
      }),

      TestResult.aggregate([
        {
          $group: {
            _id: "$category",
            averageScore: { $avg: "$percentage" },
            attempts: { $sum: 1 },
          },
        },
      ]),

      TestResult.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("user", "name email")
        .lean(),

      User.find({ role: { $ne: "admin" } })
        .sort({ createdAt: -1 })
        .limit(8)
        .select("name email createdAt lastLoginAt")
        .lean(),
    ]);

    const performanceByRound = [
      "aptitude",
      "verbal",
      "technical",
      "coding",
      "hr",
    ].map((key) => {
      const item = performance.find(
        (entry) =>
          String(entry._id || "").toLowerCase() === key
      );

      return {
        key,
        averageScore: item
          ? Math.round(item.averageScore * 10) / 10
          : 0,
        attempts: item?.attempts || 0,
      };
    });

    const recentActivityFormatted = recentActivity.map((result) => ({
      id: result._id,
      testName: result.testName,
      category: result.category,
      percentage: result.percentage,
      totalQuestions: result.totalQuestions,
      completedAt: result.createdAt,
      user: result.user
        ? {
            id: result.user._id,
            name: result.user.name,
            email: result.user.email,
          }
        : null,
    }));

    return res.status(200).json({
      stats: {
        totalUsers,
        activeUsers,
        totalAttempts,
        averageScore: Math.round(
          (scoreSummary[0]?.average || 0) * 10
        ) / 10,
        highestScore: Math.round(
          highestScoreSummary[0]?.highest || 0
        ),
        averageCompletion: Math.round(
          (completionSummary[0]?.average || 0) * 10
        ) / 10,
        newUsersLast7Days,
        attemptsLast7Days,
      },

      performanceByRound,

      recentActivity: recentActivityFormatted,

      recentUsers: recentUsers.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt || null,
      })),
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return res.status(500).json({
      message: "Unable to load admin dashboard",
    });
  }
};
