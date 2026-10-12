import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import Question from "../models/Question.js";

import {
  technicalQuestions,
} from "../../client/src/data/technicalQuestions.js";

// =====================================================
// LOAD .ENV
// =====================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

// =====================================================
// SEED TECHNICAL QUESTIONS
// =====================================================

const seedTechnicalQuestions = async () => {
  try {
    // -------------------------------------------------
    // CONNECT TO MONGODB
    // -------------------------------------------------

    await connectDB();

    console.log("Connected to MongoDB.");

    // -------------------------------------------------
    // DELETE ONLY TECHNICAL QUESTIONS
    // -------------------------------------------------

    await Question.deleteMany({
      category: "technical",
    });

    console.log(
      "Old Technical questions removed."
    );

    // -------------------------------------------------
    // PREPARE QUESTIONS
    // -------------------------------------------------

    const questionsToInsert =
      technicalQuestions.map((item) => ({
        category: "technical",

        section: item.section,

        topic: item.topic || "",

        language: item.section || null,

        difficulty: "medium",

        type: "mcq",

        question: item.question,

        options: item.options || [],

        answer: item.answer || "",

        explanation: "",

        testCases: [],
      }));

    // -------------------------------------------------
    // INSERT QUESTIONS
    // -------------------------------------------------

    await Question.insertMany(
      questionsToInsert
    );

    console.log(
      `${questionsToInsert.length} Technical questions inserted successfully.`
    );

    // -------------------------------------------------
    // TOTAL COUNT
    // -------------------------------------------------

    const totalTechnical =
      await Question.countDocuments({
        category: "technical",
      });

    console.log(
      `Total Technical questions in database: ${totalTechnical}`
    );

    // -------------------------------------------------
    // SECTION COUNTS
    // -------------------------------------------------

    const cCount =
      await Question.countDocuments({
        category: "technical",
        section: "C",
      });

    const javaCount =
      await Question.countDocuments({
        category: "technical",
        section: "Java",
      });

    const pythonCount =
      await Question.countDocuments({
        category: "technical",
        section: "Python",
      });

    const dsaCount =
      await Question.countDocuments({
        category: "technical",
        section: "DSA",
      });

    // -------------------------------------------------
    // DISPLAY RESULT
    // -------------------------------------------------

    console.log("");
    console.log(
      "======================================"
    );
    console.log(
      "TECHNICAL QUESTION BREAKDOWN"
    );
    console.log(
      "======================================"
    );

    console.log(`C:      ${cCount}`);
    console.log(`Java:   ${javaCount}`);
    console.log(`Python: ${pythonCount}`);
    console.log(`DSA:    ${dsaCount}`);

    console.log(
      "======================================"
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Technical seed error:",
      error
    );

    process.exit(1);
  }
};

// =====================================================
// RUN
// =====================================================

seedTechnicalQuestions();