import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import Question from "../models/Question.js";

import codingProblems from "../../client/src/data/codingProblems.js";


/* =====================================================
   CURRENT DIRECTORY
===================================================== */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/* =====================================================
   LOAD ENV
===================================================== */

dotenv.config({
  path: path.join(__dirname, "../.env"),
});


/* =====================================================
   SEED CODING PROBLEMS
===================================================== */

const seedCodingProblems = async () => {

  try {

    /* ================================================
       CONNECT DATABASE
    ================================================ */

    await connectDB();

    console.log("");
    console.log("======================================");
    console.log("CONNECTED TO MONGODB");
    console.log("======================================");


    /* ================================================
       REMOVE OLD CODING PROBLEMS
    ================================================ */

    await Question.deleteMany({
      category: "coding",
    });

    console.log("");
    console.log("Old coding problems removed.");


    /* ================================================
       CONVERT PROBLEMS
    ================================================ */

    const problemsToInsert =
      codingProblems.map((problem) => {

        return {

          category: "coding",

          section: "coding",

          topic:
            problem.category ||
            "DSA & Placement",

          language: null,

          difficulty:
            problem.difficulty
              ?.toLowerCase() ||
            "easy",

          type: "coding",

          title:
            problem.title ||
            "",

          question:
            problem.title ||
            "",

          description:
            problem.description ||
            "",

          exampleInput:
            problem.exampleInput ||
            "",

          exampleOutput:
            problem.exampleOutput ||
            "",

          constraints:
            problem.constraints ||
            [],

          hint:
            problem.hint ||
            "",

          starterCode: {

            C:
              problem.starterCode?.C ||
              "",

            Java:
              problem.starterCode?.Java ||
              "",

            Python:
              problem.starterCode?.Python ||
              ""

          },

          explanation:
            problem.explanation ||
            "",

          options: [],

          answer: "",

          testCases:
            problem.testCases ||
            []

        };

      });


    /* ================================================
       INSERT
    ================================================ */

    await Question.insertMany(
      problemsToInsert
    );


    console.log("");
    console.log(
      `${problemsToInsert.length} coding problems inserted successfully.`
    );


    /* ================================================
       TOTAL
    ================================================ */

    const totalCoding =
      await Question.countDocuments({
        category: "coding",
      });


    /* ================================================
       DIFFICULTY COUNTS
    ================================================ */

    const easyCount =
      await Question.countDocuments({
        category: "coding",
        difficulty: "easy",
      });


    const mediumCount =
      await Question.countDocuments({
        category: "coding",
        difficulty: "medium",
      });


    const difficultCount =
      await Question.countDocuments({
        category: "coding",
        difficulty: "difficult",
      });


    const advancedCount =
      await Question.countDocuments({
        category: "coding",
        difficulty: "advanced",
      });


    /* ================================================
       CATEGORY COUNTS
    ================================================ */

    const patternCount =
      await Question.countDocuments({
        category: "coding",
        topic: "Patterns",
      });


    const placementCount =
      await Question.countDocuments({
        category: "coding",
        topic: "DSA & Placement",
      });


    const graphCount =
      await Question.countDocuments({
        category: "coding",
        topic: "Graphs",
      });


    /* ================================================
       DISPLAY RESULT
    ================================================ */

    console.log("");

    console.log(
      "======================================"
    );

    console.log(
      "CODING PROBLEM BREAKDOWN"
    );

    console.log(
      "======================================"
    );

    console.log(
      `Total:       ${totalCoding}`
    );

    console.log(
      `Easy:        ${easyCount}`
    );

    console.log(
      `Medium:      ${mediumCount}`
    );

    console.log(
      `Difficult:   ${difficultCount}`
    );

    console.log(
      `Advanced:    ${advancedCount}`
    );

    console.log(
      "======================================"
    );


    console.log("");

    console.log(
      "======================================"
    );

    console.log(
      "CODING CATEGORY BREAKDOWN"
    );

    console.log(
      "======================================"
    );

    console.log(
      `Placement Coding: ${placementCount}`
    );

    console.log(
      `Patterns:         ${patternCount}`
    );

    console.log(
      `Graphs:           ${graphCount}`
    );

    console.log(
      "======================================"
    );


    /* ================================================
       EXPECTED RESULT
    ================================================ */

    if (
      totalCoding === 80 &&
      easyCount === 20 &&
      mediumCount === 20 &&
      difficultCount === 20 &&
      advancedCount === 20
    ) {

      console.log("");
      console.log(
        "SUCCESS: 80 CODING PROBLEMS SEEDED."
      );

    } else {

      console.log("");
      console.log(
        "WARNING: Problem count is not 20/20/20/20."
      );

    }


    console.log("");
    console.log(
      "Coding problems seeded successfully."
    );


    process.exit(0);

  } catch (error) {

    console.error("");
    console.error(
      "======================================"
    );

    console.error(
      "CODING SEED ERROR"
    );

    console.error(
      "======================================"
    );

    console.error(error);

    process.exit(1);
  }
};


seedCodingProblems();