import { Link, useLocation } from "react-router-dom";

import {
  CheckCircle2,
  CircleX,
  CircleHelp,
  Lightbulb,
  Target,
  ArrowLeft,
  BarChart3,
} from "lucide-react";

import "./TestResult.css";

export default function TestResult() {
  const location = useLocation();

  let result = location.state?.result || null;

  // Get saved result if navigation state is unavailable
  if (!result) {
    try {
      const savedResult =
        sessionStorage.getItem("lastTestResult");

      if (savedResult) {
        result = JSON.parse(savedResult);
      }
    } catch (error) {
      console.error("Error reading test result:", error);
      result = null;
    }
  }

  // Default result
  if (!result) {
    result = {
      testName: "Technical Test",
      totalQuestions: 0,
      correct: 0,
      incorrect: 0,
      unanswered: 0,
      percentage: 0,
      suggestions: [
        "Review the concepts carefully.",
        "Practice more technical questions.",
      ],
    };
  }

  // Result values
  const totalQuestions = Number(
    result.totalQuestions ?? result.total ?? 0
  );

  const correct = Number(
    result.correct ?? 0
  );

  const incorrect = Number(
    result.incorrect ?? 0
  );

  const unanswered = Number(
    result.unanswered ??
      Math.max(
        totalQuestions - correct - incorrect,
        0
      )
  );

  const percentage = Math.min(
    Math.max(
      Number(result.percentage ?? 0),
      0
    ),
    100
  );

  const answered = Math.max(
    totalQuestions - unanswered,
    0
  );

  // AI feedback
  let feedback;

  if (percentage >= 80) {
    feedback =
      "Excellent work. Your performance shows strong preparation for this technical round.";
  } else if (percentage >= 60) {
    feedback =
      "Good progress. Focus on the questions you missed and continue practicing under time pressure.";
  } else {
    feedback =
      "Your preparation needs improvement. Revise the fundamentals and practice more technical questions.";
  }

  // Suggestions
  let suggestions;

  if (
    Array.isArray(result.suggestions) &&
    result.suggestions.length > 0
  ) {
    suggestions = result.suggestions;
  } else if (percentage >= 80) {
    suggestions = [
      "Continue practicing advanced technical questions.",
      "Strengthen DSA and problem-solving skills.",
    ];
  } else if (percentage >= 60) {
    suggestions = [
      "Review the questions you answered incorrectly.",
      "Practice C, Java, Python and DSA concepts regularly.",
    ];
  } else {
    suggestions = [
      "Revise fundamental programming concepts.",
      "Practice more placement-focused technical MCQs.",
      "Review your incorrect answers before attempting another test.",
    ];
  }

  return (
    <div className="test-result-page">

      <div className="test-result-card">

        {/* SUCCESS */}

        <div className="test-result-icon">
          <CheckCircle2 size={44} />
        </div>

        <div className="test-result-label">
          AI PERFORMANCE REPORT
        </div>

        {/* TITLE */}

        <h1>
          Test Completed
        </h1>

        <p className="test-result-subtitle">
          Your{" "}
          <strong>
            {result.testName || "Technical Test"}
          </strong>{" "}
          has been submitted successfully.
        </p>

        {/* SCORE */}

        <div className="test-result-score">

          <strong>
            {correct}
            <span>
              {" "}/ {totalQuestions}
            </span>
          </strong>

          <p>
            You scored{" "}
            <b>{percentage}%</b>
          </p>

        </div>

        {/* STATISTICS */}

        <div className="test-result-stats">

          <Stat
            icon={<CheckCircle2 size={25} />}
            title="Correct"
            value={correct}
            className="correct"
          />

          <Stat
            icon={<CircleX size={25} />}
            title="Incorrect"
            value={incorrect}
            className="incorrect"
          />

          <Stat
            icon={<CircleHelp size={25} />}
            title="Unanswered"
            value={unanswered}
            className="unanswered"
          />

        </div>

        {/* PERFORMANCE */}

        <div className="test-result-performance">

          <div className="test-result-section-title">

            <Target size={19} />

            <span>
              Performance
            </span>

          </div>

          <div className="test-result-bar">

            <span
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

          <div className="test-result-bar-label">

            <span>
              {answered} answered
            </span>

            <b>
              {percentage}%
            </b>

          </div>

        </div>

        {/* AI FEEDBACK */}

        <div className="test-result-feedback">

          <div className="test-result-section-title">

            <Lightbulb size={19} />

            <span>
              AI Feedback & Suggestions
            </span>

          </div>

          <p className="feedback-summary">
            {feedback}
          </p>

          <ul>
            {suggestions.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

        </div>

        {/* BUTTONS */}

        <div className="test-result-actions">

          <Link
            to="/dashboard"
            className="secondary-result-btn"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>

          <Link
            to="/results"
            className="primary-result-btn"
          >
            <BarChart3 size={17} />
            View Results
          </Link>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   STAT COMPONENT
===================================================== */

function Stat({
  icon,
  title,
  value,
  className,
}) {
  return (
    <div
      className={`test-result-stat ${
        className || ""
      }`}
    >

      <span>
        {icon}
      </span>

      <div>

        <small>
          {title}
        </small>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}