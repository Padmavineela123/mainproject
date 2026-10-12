import TestResult from "../models/TestResult.js";

// =====================================
// GENERATE AI FEEDBACK
// =====================================
export const generateFeedback = async (req, res) => {
  try {
    const {
      aptitudeScore = 0,
      technicalScore = 0,
      codingScore = 0,
      hrScore = 0,
    } = req.body;

    const scores = {
      Aptitude: Number(aptitudeScore),
      Technical: Number(technicalScore),
      Coding: Number(codingScore),
      HR: Number(hrScore),
    };

    const strengths = [];
    const weaknesses = [];
    const suggestions = [];

    Object.entries(scores).forEach(([category, score]) => {
      if (score >= 75) {
        strengths.push(category);
      } else {
        weaknesses.push(category);
      }
    });

    if (weaknesses.length > 0) {
      suggestions.push(
        `Practice more ${weaknesses.join(", ")} questions.`
      );
    }

    suggestions.push(
      "Practice timed tests regularly."
    );

    suggestions.push(
      "Review incorrect answers after every test."
    );

    const overallScore =
      Object.values(scores).reduce(
        (sum, value) => sum + value,
        0
      ) / Object.keys(scores).length;

    return res.status(200).json({
      message: "Feedback generated successfully",
      overallScore: Math.round(overallScore),
      strengths,
      weaknesses,
      suggestions,
    });
  } catch (error) {
    console.error("AI feedback error:", error);

    return res.status(500).json({
      message: "Unable to generate feedback",
    });
  }
};