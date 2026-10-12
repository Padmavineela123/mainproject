import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Question from "../models/Question.js";

import { aptitudeQuestions } from "../../client/src/data/basicAptitudeQuestions.js";

const seedBasicAptitude = async () => {
  try {
    await connectDB();

    console.log(
      `Found ${aptitudeQuestions.length} basic aptitude questions.`
    );

    // Remove only existing Basic Aptitude questions
    await Question.deleteMany({
      category: "aptitude",
      section: "basic",
    });

    // Convert existing frontend questions to MongoDB format
    const questionsToInsert = aptitudeQuestions.map(
      (item) => ({
        category: "aptitude",
        section: "basic",
        topic: item.topic || "",
        language: null,
        difficulty: "basic",
        type: "mcq",
        question: item.question,
        options: item.options,
        answer: item.answer,
        explanation: "",
        testCases: [],
      })
    );

    await Question.insertMany(questionsToInsert);

    console.log(
      `${questionsToInsert.length} Basic Aptitude questions inserted successfully.`
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Basic Aptitude seed error:",
      error
    );

    process.exit(1);
  }
};

seedBasicAptitude();