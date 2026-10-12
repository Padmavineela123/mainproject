import Question from "../models/Question.js";

// =====================================
// GET QUESTIONS
// =====================================
export const getQuestions = async (req, res) => {
  try {
    const {
      category,
      section,
      language,
      difficulty,
      type,
      limit = 25,
    } = req.query;

    // Build filter
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (section) {
      filter.section = section;
    }

    if (language) {
      filter.language = language;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (type) {
      filter.type = type;
    }

    // Limit maximum questions to 500
    const requestedLimit = Math.min(
  Number(limit) || 25,
  category === "coding" ? 200 : 100
);

    // Get random questions
    const questions = await Question.aggregate([
      {
        $match: filter,
      },
      {
        $sample: {
          size: requestedLimit,
        },
      },
      {
        $project: {
          answer: 0,
        },
      },
    ]);

    res.status(200).json({
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error("Question error:", error);

    res.status(500).json({
      message: "Unable to fetch questions",
    });
  }
};