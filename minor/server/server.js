
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import compilerRoutes from "./routes/compilerRoutes.js";

dotenv.config();

const app = express();

// =====================================
// CONNECT DATABASE
// =====================================
connectDB();

// =====================================
// CONFIGURATION
// =====================================
const PORT = process.env.PORT || 5000;

const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const DEFAULT_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

const ALLOWED_ORIGINS =
  CLIENT_ORIGINS.length > 0
    ? CLIENT_ORIGINS
    : DEFAULT_ORIGINS;

// =====================================
// MIDDLEWARE
// =====================================
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error(`Origin ${origin} is not allowed by CORS`)
        );
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// =====================================
// HOME / TEST ROUTE
// =====================================
app.get("/", (req, res) => {
  res.json({
    message: "AI Interview Preparation API is running",
  });
});

// =====================================
// AUTHENTICATION
// =====================================
app.use("/api/auth", authRoutes);

// =====================================
// QUESTIONS
// =====================================
app.use("/api/questions", questionRoutes);

// =====================================
// TEST RESULTS
// =====================================
app.use("/api/tests", testRoutes);

// =====================================
// AI FEEDBACK
// =====================================
app.use("/api/ai", aiRoutes);

// =====================================
// ADMIN PANEL
// =====================================
app.use("/api/admin", adminRoutes);

// =====================================
// CODING COMPILER
// =====================================
app.use("/api/compiler", compilerRoutes);

// =====================================
// START SERVER
// =====================================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});