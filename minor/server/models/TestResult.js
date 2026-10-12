import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema(
  {
    // Student
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Test information
    testName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    // Examples:
    // basic
    // advanced
    // C
    // Java
    // Python
    // DSA
    // coding
    // hr
    section: {
      type: String,
      default: "",
    },

    // Question statistics
    totalQuestions: {
      type: Number,
      default: 0,
    },

    correct: {
      type: Number,
      default: 0,
    },

    incorrect: {
      type: Number,
      default: 0,
    },

    unanswered: {
      type: Number,
      default: 0,
    },

    // Score
    percentage: {
      type: Number,
      default: 0,
    },

    // Time in seconds
    totalTime: {
      type: Number,
      default: 0,
    },

    // HR answers
    hrAnswers: {
      type: [
        {
          questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
          },

          question: {
            type: String,
            default: "",
          },

          answer: {
            type: String,
            default: "",
          },

          answerMode: {
            type: String,
            enum: ["text", "voice"],
            default: "text",
          },
        },
      ],
      default: [],
    },

    // Performance
    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    suggestions: {
      type: [String],
      default: [],
    },

    // Optional ML & NLP evaluation metrics (non-breaking)
    confidenceScore: {
      type: Number,
      default: 0,
    },

    relevanceScore: {
      type: Number,
      default: 0,
    },

    fluencyScore: {
      type: Number,
      default: 0,
    },

    nlpMetrics: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model(
  "TestResult",
  testResultSchema
);