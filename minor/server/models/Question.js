import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    // Main category
    category: {
      type: String,
      enum: [
        "aptitude",
        "verbal",
        "technical",
        "dsa",
        "coding",
        "hr",
      ],
      required: true,
    },

    // Section
    section: {
      type: String,
      required: true,
    },

    // Topic
    topic: {
      type: String,
      default: "",
    },

    // Programming language
    language: {
      type: String,
      default: null,
    },

    // Difficulty
    difficulty: {
      type: String,
      enum: [
        "basic",
        "medium",
        "advanced",
        "easy",
        "hard",
        "difficult",
      ],
      default: "basic",
    },

    // Question type
    type: {
      type: String,
      enum: [
        "mcq",
        "fill_blank",
        "coding",
        "hr",
      ],
      default: "mcq",
    },

    // ==============================
    // MCQ / Verbal Question Fields
    // ==============================

    question: {
      type: String,
      default: "",
    },

    options: {
      type: [String],
      default: [],
    },

    answer: {
      type: String,
      default: "",
    },

    // ==============================
    // Coding Problem Fields
    // ==============================

    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    exampleInput: {
      type: String,
      default: "",
    },

    exampleOutput: {
      type: String,
      default: "",
    },

    constraints: {
      type: [String],
      default: [],
    },

    hint: {
      type: String,
      default: "",
    },

    starterCode: {
      C: {
        type: String,
        default: "",
      },

      Java: {
        type: String,
        default: "",
      },

      Python: {
        type: String,
        default: "",
      },
    },

    explanation: {
      type: String,
      default: "",
    },

    // Coding problem test cases
    testCases: [
      {
        input: {
          type: String,
          default: "",
        },

        output: {
          type: String,
          default: "",
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Question",
  questionSchema
);