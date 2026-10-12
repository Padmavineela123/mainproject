import TestResult from "../models/TestResult.js";
import Question from "../models/Question.js";
import { evaluateInterviewNLP } from "../utils/nlpEvaluator.js";

// =====================================
// SUBMIT TEST AND CALCULATE RESULT
// =====================================
export const submitTest = async (req, res) => {
  try {
    const {
      testName,
      category,
      section,
      answers = [],
      totalTime = 0,
    } = req.body;

    // -------------------------------------
    // VALIDATION
    // -------------------------------------
    if (!testName || !category) {
      return res.status(400).json({
        message:
          "Test name and category are required",
      });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        message:
          "Answers must be an array",
      });
    }

    // -------------------------------------
    // GET QUESTION IDS
    // -------------------------------------
    const questionIds = answers
      .map((item) => item.questionId)
      .filter(Boolean);

    // -------------------------------------
    // FIND QUESTIONS IN DATABASE
    // -------------------------------------
    const filter = {
      _id: {
        $in: questionIds,
      },
    };

    if (category) {
      filter.category = category;
    }

    if (section) {
      filter.section = section;
    }

    const questions =
      await Question.find(filter);

    // -------------------------------------
    // QUESTION MAP
    // -------------------------------------
    const questionMap = new Map();

    questions.forEach((question) => {
      questionMap.set(
        question._id.toString(),
        question
      );
    });

    // -------------------------------------
    // CALCULATE SCORE
    // -------------------------------------
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    // -------------------------------------
    // COUNT UNANSWERED QUESTIONS (questions not submitted at all)
    // -------------------------------------
    const submittedQuestionIds =
      new Set(
        answers
          .map((item) => item.questionId)
          .filter(Boolean)
          .map((id) => String(id))
      );

    questions.forEach((question) => {
      const questionId =
        question._id.toString();

      if (
        !submittedQuestionIds.has(
          questionId
        )
      ) {
        unanswered++;
      }
    });

    // -------------------------------------
    // CHECK SUBMITTED ANSWERS
    // (a submitted but blank answer is also counted as unanswered)
    // -------------------------------------
    answers.forEach((item) => {
      const question =
        questionMap.get(
          String(item.questionId)
        );

      if (!question) {
        return;
      }

      const submittedAnswer =
        item.answer;

      // No answer (blank submission for a known question)
      if (
        submittedAnswer === undefined ||
        submittedAnswer === null ||
        String(submittedAnswer).trim() === ""
      ) {
        unanswered++;
        return;
      }

      // Correct answer
      if (
        String(submittedAnswer).trim() ===
        String(question.answer).trim()
      ) {
        correct++;
      } else {
        incorrect++;
      }
    });

    // -------------------------------------
    // TOTAL QUESTIONS
    // -------------------------------------
    const totalQuestions =
      questions.length;

    // -------------------------------------
    // PERCENTAGE
    // -------------------------------------
    const percentage =
      totalQuestions > 0
        ? Math.round(
            (correct /
              totalQuestions) *
              100
          )
        : 0;

    // -------------------------------------
    // STRENGTHS
    // -------------------------------------
    const strengths = [];

    if (percentage >= 75) {
      strengths.push(
        "Good performance"
      );
    }

    // -------------------------------------
    // WEAKNESSES
    // -------------------------------------
    const weaknesses = [];

    if (percentage < 75) {
      weaknesses.push(
        "Needs more practice"
      );
    }

    // -------------------------------------
    // SUGGESTIONS
    // -------------------------------------
    const suggestions = [];

    if (percentage < 50) {
      suggestions.push(
        "Review the concepts carefully."
      );

      suggestions.push(
        "Practice more questions."
      );
    } else if (percentage < 75) {
      suggestions.push(
        "Improve speed and accuracy."
      );

      suggestions.push(
        "Review your incorrect answers."
      );
    } else {
      suggestions.push(
        "Continue practicing timed tests."
      );

      suggestions.push(
        "Maintain your accuracy while improving speed."
      );
    }

    // -------------------------------------
    // SAVE RESULT
    // -------------------------------------
    const result =
      await TestResult.create({
        user: req.user.id,

        testName,

        category,

        totalQuestions,

        correct,

        incorrect,

        unanswered,

        percentage,

        totalTime,

        strengths,

        weaknesses,

        suggestions,
      });

    // -------------------------------------
    // RESPONSE
    // -------------------------------------
    return res.status(201).json({
      message:
        "Test submitted successfully",

      result: {
        id: result._id,

        testName:
          result.testName,

        category:
          result.category,

        totalQuestions:
          result.totalQuestions,

        correct:
          result.correct,

        incorrect:
          result.incorrect,

        unanswered:
          result.unanswered,

        percentage:
          result.percentage,

        totalTime:
          result.totalTime,

        strengths:
          result.strengths,

        weaknesses:
          result.weaknesses,

        suggestions:
          result.suggestions,

        completedAt:
          result.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Submit test error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to submit test",
    });
  }
};


// =====================================
// SAVE TEST RESULT
// =====================================
export const saveTestResult = async (
  req,
  res
) => {
  try {
    const {
      testName,
      category,
      totalQuestions,
      correct,
      incorrect,
      unanswered,
      percentage,
      totalTime,
      strengths,
      weaknesses,
      suggestions,
    } = req.body;

    // -------------------------------------
    // VALIDATION
    // -------------------------------------
    if (!testName || !category) {
      return res.status(400).json({
        message:
          "Test name and category are required",
      });
    }

    // -------------------------------------
    // CREATE RESULT
    // -------------------------------------
    const result =
      await TestResult.create({
        user: req.user.id,

        testName,

        category,

        totalQuestions:
          totalQuestions || 0,

        correct:
          correct || 0,

        incorrect:
          incorrect || 0,

        unanswered:
          unanswered || 0,

        percentage:
          percentage || 0,

        totalTime:
          totalTime || 0,

        strengths:
          strengths || [],

        weaknesses:
          weaknesses || [],

        suggestions:
          suggestions || [],
      });

    // -------------------------------------
    // RESPONSE
    // -------------------------------------
    return res.status(201).json({
      message:
        "Test result saved successfully",

      result,
    });
  } catch (error) {
    console.error(
      "Save result error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to save test result",
    });
  }
};


// =====================================
// GET MY TEST HISTORY
// =====================================
export const getMyResults = async (
  req,
  res
) => {
  try {
    const results =
      await TestResult.find({
        user: req.user.id,
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json({
      count: results.length,
      results,
    });
  } catch (error) {
    console.error(
      "History error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to fetch test history",
    });
  }
};


// =====================================
// SUBMIT HR INTERVIEW
// =====================================
export const submitHRInterview = async (
  req,
  res
) => {
  try {
    const {
      testName = "HR Interview",
      category = "hr",
      section = "",
      answers = [],
      totalTime = 0,
    } = req.body;

    // -------------------------------------
    // VALIDATION
    // -------------------------------------
    if (!Array.isArray(answers)) {
      return res.status(400).json({
        message:
          "HR answers must be an array",
      });
    }

    // -------------------------------------
    // FORMAT HR ANSWERS
    // -------------------------------------
    const hrAnswers = answers
      .map((item) => ({
        questionId:
          item.questionId || null,

        question:
          item.question || "",

        answer:
          item.answer || "",

        answerMode:
          item.answerMode === "voice"
            ? "voice"
            : "text",
      }))
      .filter(
        (item) =>
          item.questionId &&
          item.question
      );

    // -------------------------------------
    // QUESTION STATISTICS
    // -------------------------------------
    const totalQuestions =
      hrAnswers.length;

    const answered =
      hrAnswers.filter(
        (item) =>
          item.answer &&
          item.answer.trim() !== ""
      ).length;

    const unanswered =
      totalQuestions - answered;

    // -------------------------------------
    // HR COMPLETION PERCENTAGE
    // -------------------------------------
    const percentage =
      totalQuestions > 0
        ? Math.round(
            (answered /
              totalQuestions) *
              100
          )
        : 0;

    // -------------------------------------
    // RUN NLP & ML EVALUATION ON CANDIDATE ANSWERS
    // -------------------------------------
    const nlpEvaluation = evaluateInterviewNLP(hrAnswers);

    // -------------------------------------
    // STRENGTHS
    // -------------------------------------
    const strengths = [];

    if (percentage >= 75) {
      strengths.push("Good HR interview participation");
    }
    if (nlpEvaluation.confidenceScore >= 70) {
      strengths.push("High candidate tone confidence and positive verbal sentiment");
    }
    if (nlpEvaluation.relevanceScore >= 70) {
      strengths.push("Strong topical relevance and competency keyword alignment");
    }
    if (nlpEvaluation.fluencyScore >= 75) {
      strengths.push("Excellent communication fluency with minimal hesitation");
    }

    // -------------------------------------
    // WEAKNESSES
    // -------------------------------------
    const weaknesses = [];

    if (percentage < 75) {
      weaknesses.push("HR interview completion");
    }
    if (nlpEvaluation.confidenceScore < 65) {
      weaknesses.push("Answer assertiveness and confidence");
    }
    if (nlpEvaluation.relevanceScore < 60) {
      weaknesses.push("Professional keyword coverage in answers");
    }
    if (nlpEvaluation.fillerCount > 2) {
      weaknesses.push(`Speech pauses (${nlpEvaluation.fillerCount} filler word(s) detected)`);
    }

    // -------------------------------------
    // SUGGESTIONS & GUIDANCE (ML-DRIVEN)
    // -------------------------------------
    const suggestions = [
      ...nlpEvaluation.insights
    ];

    if (percentage < 50) {
      suggestions.push("Practice answering common HR interview questions.");
    } else if (percentage < 75) {
      suggestions.push("Improve the clarity and structured flow of your answers.");
    } else {
      suggestions.push("Maintain clear, confident responses and structured delivery.");
    }

    // -------------------------------------
    // SAVE HR RESULT
    // -------------------------------------
    const result = await TestResult.create({
      user: req.user.id,
      testName,
      category,
      section: section || "",
      totalQuestions,
      correct: answered,
      incorrect: 0,
      unanswered,
      percentage,
      totalTime,
      hrAnswers,
      strengths,
      weaknesses,
      suggestions,
      confidenceScore: nlpEvaluation.confidenceScore,
      relevanceScore: nlpEvaluation.relevanceScore,
      fluencyScore: nlpEvaluation.fluencyScore,
      nlpMetrics: nlpEvaluation,
    });

    // -------------------------------------
    // RESPONSE
    // -------------------------------------
    return res.status(201).json({
      message: "HR interview submitted successfully",
      result: {
        id: result._id,
        testName: result.testName,
        category: result.category,
        totalQuestions: result.totalQuestions,
        answered: result.correct,
        unanswered: result.unanswered,
        percentage: result.percentage,
        totalTime: result.totalTime,
        hrAnswers: result.hrAnswers,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        suggestions: result.suggestions,
        confidenceScore: nlpEvaluation.confidenceScore,
        relevanceScore: nlpEvaluation.relevanceScore,
        fluencyScore: nlpEvaluation.fluencyScore,
        nlpMetrics: nlpEvaluation,
        completedAt: result.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "HR interview submit error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to submit HR interview",
    });
  }
};