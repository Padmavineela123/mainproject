import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import Question from "../models/Question.js";

import hrQuestions from "../../client/src/data/hrQuestions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const seedHRQuestions = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB.");

    await Question.deleteMany({
      category: "hr",
    });

    console.log("Old HR questions removed.");

    const questionsToInsert = hrQuestions.map((item) => ({
      category: "hr",

      section: item.category,

      topic: item.category,

      language: null,

      difficulty: "basic",

      type: "hr",

      question: item.question,

      options: [],

      answer: "",

      explanation: "",

      testCases: [],
    }));

    await Question.insertMany(questionsToInsert);

    console.log(
      `${questionsToInsert.length} HR questions inserted successfully.`
    );

    const totalHR = await Question.countDocuments({
      category: "hr",
    });

    console.log(
      `Total HR questions in database: ${totalHR}`
    );

    console.log("");
    console.log("======================================");
    console.log("HR QUESTION BREAKDOWN");
    console.log("======================================");

    const categories = await Question.aggregate([
      {
        $match: {
          category: "hr",
        },
      },
      {
        $group: {
          _id: "$section",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    categories.forEach((item) => {
      console.log(
        `${item._id}: ${item.count}`
      );
    });

    console.log("======================================");
    console.log("HR questions seeded successfully.");

    process.exit(0);
  } catch (error) {
    console.error(
      "HR seed error:",
      error
    );

    process.exit(1);
  }
};

seedHRQuestions();