import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Flag,
  RotateCcw,
  Trophy,
  XCircle,
  Sparkles,
  Target,
  Brain,
  Timer,
  Lightbulb,
  BarChart2,
  X,
} from "lucide-react";

import "./AdvancedAptitude.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdvancedAptitude() {
  const navigate = useNavigate();

  // =====================================================
  // TEST CONFIGURATION
  // =====================================================

  // 60 minutes
  const TEST_DURATION = 60 * 60;

  // =====================================================
  // QUESTIONS
  // =====================================================

  const [aptitudeQuestions, setAptitudeQuestions] =
    useState([]);

  const [loadingQuestions, setLoadingQuestions] =
    useState(true);

  const [questionError, setQuestionError] =
    useState("");

  // =====================================================
  // TEST STATE
  // =====================================================

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [markedQuestions, setMarkedQuestions] =
    useState([]);

  const [showQuestionMenu, setShowQuestionMenu] =
    useState(false);

  const [showSidePanel, setShowSidePanel] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(TEST_DURATION);

  const [submitted, setSubmitted] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);

  // =====================================================
  // LOAD QUESTIONS
  // =====================================================

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoadingQuestions(true);
        setQuestionError("");

        const response = await fetch(
          `${API_URL}/api/questions?category=aptitude&section=advanced&limit=30`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to load Advanced Aptitude questions"
          );
        }

        setAptitudeQuestions(
          data.questions || []
        );
      } catch (error) {
        console.error(
          "Advanced Aptitude question error:",
          error
        );

        setQuestionError(
          error.message ||
            "Unable to load questions"
        );
      } finally {
        setLoadingQuestions(false);
      }
    };

    fetchQuestions();
  }, []);

  // =====================================================
  // TOTAL QUESTIONS
  // =====================================================

  const totalQuestions =
    aptitudeQuestions.length;

  const question =
    aptitudeQuestions[currentQuestion];

  // =====================================================
  // TIMER
  // =====================================================

  useEffect(() => {
    if (
      submitted ||
      loadingQuestions
    ) {
      return;
    }

    if (timeLeft <= 0) {
      calculateResult();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    timeLeft,
    submitted,
    loadingQuestions,
  ]);

  // =====================================================
  // FORMAT TIMER
  // =====================================================

  const formatTime = (seconds) => {
    const hours = Math.floor(
      seconds / 3600
    );

    const minutes = Math.floor(
      (seconds % 3600) / 60
    );

    const remainingSeconds =
      seconds % 60;

    return `${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // =====================================================
  // SELECT ANSWER
  // =====================================================

  const handleAnswer = (answer) => {
    if (!question) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [question._id]: answer,
    }));
  };

  // =====================================================
  // NEXT
  // =====================================================

  const goNext = () => {
    if (
      currentQuestion <
      totalQuestions - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
    }
  };

  // =====================================================
  // PREVIOUS
  // =====================================================

  const goPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );
    }
  };

  // =====================================================
  // GO TO QUESTION
  // =====================================================

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
    setShowQuestionMenu(false);
  };

  // =====================================================
  // MARK FOR REVIEW
  // =====================================================

  const toggleMark = () => {
    if (!question) {
      return;
    }

    setMarkedQuestions((previous) => {
      if (
        previous.includes(
          question._id
        )
      ) {
        return previous.filter(
          (id) =>
            id !== question._id
        );
      }

      return [
        ...previous,
        question._id,
      ];
    });
  };

  // =====================================================
  // AI PERFORMANCE SUGGESTIONS
  // =====================================================

  const generatePerformanceSuggestions = (
    performance
  ) => {
    const suggestions = [];

    const percentage =
      Number(performance.percentage) || 0;

    const correct =
      Number(performance.correct) || 0;

    const incorrect =
      Number(performance.incorrect) || 0;

    const unanswered =
      Number(performance.unanswered) || 0;

    const total =
      correct +
      incorrect +
      unanswered;

    const timeUsed =
      Number(performance.timeUsed) || 0;

    // ---------------------------------------------
    // SCORE BASED FEEDBACK
    // ---------------------------------------------

    if (percentage >= 85) {
      suggestions.push({
        icon: Trophy,
        title: "Excellent performance",
        text:
          "Your accuracy is strong. Move towards harder aptitude problems and timed mock tests to maintain this level.",
        type: "success",
      });
    } else if (percentage >= 70) {
      suggestions.push({
        icon: Target,
        title: "Good foundation",
        text:
          "You have a solid understanding of aptitude concepts. Focus on reducing mistakes in difficult questions.",
        type: "positive",
      });
    } else if (percentage >= 50) {
      suggestions.push({
        icon: Brain,
        title: "Improve conceptual accuracy",
        text:
          "Your fundamentals need more practice. Review the concepts behind the questions you answered incorrectly before attempting another advanced test.",
        type: "warning",
      });
    } else {
      suggestions.push({
        icon: Lightbulb,
        title: "Strengthen your fundamentals",
        text:
          "Start with basic and intermediate aptitude problems, then gradually return to advanced questions.",
        type: "warning",
      });
    }

    // ---------------------------------------------
    // INCORRECT ANSWERS
    // ---------------------------------------------

    if (incorrect > 0) {
      const errorRate =
        total > 0
          ? (incorrect / total) * 100
          : 0;

      if (errorRate >= 30) {
        suggestions.push({
          icon: XCircle,
          title: "Reduce incorrect answers",
          text:
            "A significant portion of your attempts were incorrect. Slow down, identify the required formula or reasoning pattern, and eliminate options before selecting an answer.",
          type: "danger",
        });
      } else {
        suggestions.push({
          icon: Target,
          title: "Review your mistakes",
          text:
            `You made ${incorrect} incorrect ${
              incorrect === 1
                ? "answer"
                : "answers"
            }. Revisit these question types and practice similar problems.`,
          type: "warning",
        });
      }
    }

    // ---------------------------------------------
    // UNANSWERED
    // ---------------------------------------------

    if (unanswered > 0) {
      suggestions.push({
        icon: Clock,
        title: "Improve question completion",
        text:
          `You left ${unanswered} ${
            unanswered === 1
              ? "question"
              : "questions"
          } unanswered. If a question is taking too long, skip it and return later.`,
        type: "warning",
      });
    }

    // ---------------------------------------------
    // TIME MANAGEMENT
    // ---------------------------------------------

    if (
      timeUsed >
      TEST_DURATION * 0.85
    ) {
      suggestions.push({
        icon: Timer,
        title: "Work on time management",
        text:
          "You used most of the available test time. Practice solving questions with a fixed time limit and avoid spending too long on a single problem.",
        type: "warning",
      });
    } else if (
      unanswered === 0 &&
      timeUsed <
        TEST_DURATION * 0.55
    ) {
      suggestions.push({
        icon: Timer,
        title: "Balance speed with accuracy",
        text:
          "You completed the test quickly. Make sure your speed is not causing avoidable calculation or reading mistakes.",
        type: "positive",
      });
    }

    // ---------------------------------------------
    // FINAL PRACTICE SUGGESTION
    // ---------------------------------------------

    if (percentage < 70) {
      suggestions.push({
        icon: Sparkles,
        title: "Recommended next step",
        text:
          "Practice 15–20 questions daily from quantitative aptitude, reasoning, puzzles and data interpretation. Reattempt incorrect questions after reviewing the solution.",
        type: "info",
      });
    } else {
      suggestions.push({
        icon: Sparkles,
        title: "Recommended next step",
        text:
          "Try another advanced mock test with a shorter time limit and focus on maintaining accuracy under pressure.",
        type: "info",
      });
    }

    return suggestions;
  };

  // =====================================================
  // CALCULATE / SUBMIT RESULT
  // =====================================================

  async function calculateResult() {
    if (
      submitted ||
      submitting
    ) {
      return;
    }

    try {
      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        alert(
          "Please login before submitting the test."
        );

        navigate("/login");

        return;
      }

      setSubmitting(true);

      // ---------------------------------------------
      // PREPARE ANSWERS
      // ---------------------------------------------

      const submittedAnswers =
        aptitudeQuestions.map(
          (item) => ({
            questionId: item._id,
            answer:
              answers[item._id] || "",
          })
        );

      // ---------------------------------------------
      // TIME USED
      // ---------------------------------------------

      const totalTime =
        TEST_DURATION -
        timeLeft;

      // ---------------------------------------------
      // SEND TO BACKEND
      // ---------------------------------------------

      const response =
        await fetch(
          `${API_URL}/api/tests/submit`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              testName:
                "Advanced Aptitude",

              category:
                "aptitude",

              section:
                "advanced",

              answers:
                submittedAnswers,

              totalTime,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to submit test"
        );
      }

      // ---------------------------------------------
      // BACKEND RESULT
      // ---------------------------------------------

      const backendResult =
        data.result;

      // ---------------------------------------------
      // SAVE RESULT
      // ---------------------------------------------

      localStorage.setItem(
        "aptitudeAdvancedScore",
        backendResult.percentage
      );

      localStorage.setItem(
        "aptitudeAdvancedCorrect",
        backendResult.correct
      );

      localStorage.setItem(
        "aptitudeAdvancedTotal",
        backendResult.totalQuestions
      );

      localStorage.setItem(
        "aptitudeAdvancedCompleted",
        "true"
      );

      // ---------------------------------------------
      // SET RESULT
      // ---------------------------------------------

      setResult({
        correct:
          backendResult.correct,

        incorrect:
          backendResult.incorrect,

        unanswered:
          backendResult.unanswered,

        percentage:
          Number(
            backendResult.percentage
          ),

        timeUsed:
          totalTime,
      });

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Advanced Aptitude submit error:",
        error
      );

      alert(
        error.message ||
          "Unable to submit test"
      );
    } finally {
      setSubmitting(false);
    }
  }

  // =====================================================
  // SUBMIT TEST
  // =====================================================

  const submitTest = () => {
    calculateResult();
  };

  // =====================================================
  // RESTART TEST
  // =====================================================

  const restartTest = () => {
    setCurrentQuestion(0);

    setAnswers({});

    setMarkedQuestions([]);

    setShowQuestionMenu(false);

    setTimeLeft(
      TEST_DURATION
    );

    setSubmitted(false);

    setResult(null);

    setSubmitting(false);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loadingQuestions) {
    return (
      <div className="advanced-aptitude-page">
        <div className="result-container">

          <div className="result-icon loading-icon">
            <Clock size={50} />
          </div>

          <h1>
            Loading Advanced Aptitude...
          </h1>

          <p className="result-message">
            Please wait while the
            questions are loaded.
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (questionError) {
    return (
      <div className="advanced-aptitude-page">

        <div className="result-container">

          <div className="result-icon error-icon">
            <XCircle size={50} />
          </div>

          <h1>
            Unable to Load Questions
          </h1>

          <p className="result-message">
            {questionError}
          </p>

          <Link
            to="/aptitude"
            className="back-button"
          >
            <ArrowLeft size={18} />
            Back to Aptitude
          </Link>

        </div>

      </div>
    );
  }

  // =====================================================
  // NO QUESTIONS
  // =====================================================

  if (totalQuestions === 0) {
    return (
      <div className="advanced-aptitude-page">

        <div className="result-container">

          <div className="result-icon error-icon">
            <XCircle size={50} />
          </div>

          <h1>
            No Questions Available
          </h1>

          <p className="result-message">
            No Advanced Aptitude
            questions were found in
            the database.
          </p>

          <Link
            to="/aptitude"
            className="back-button"
          >
            <ArrowLeft size={18} />
            Back to Aptitude
          </Link>

        </div>

      </div>
    );
  }

  // =====================================================
  // RESULT PAGE
  // =====================================================

  if (
    submitted &&
    result
  ) {
    const scorePercentage =
      Number(
        result.percentage
      ) || 0;

    const circumference =
      2 * Math.PI * 62;

    const progressOffset =
      circumference -
      (circumference *
        scorePercentage) /
        100;

    const aiSuggestions =
      generatePerformanceSuggestions(
        result
      );

    return (
      <div className="advanced-aptitude-page">

        <div className="result-container">

          {/* =========================================
              RESULT ICON
          ========================================= */}

          <div className="result-icon">
            <Trophy size={50} />
          </div>

          {/* =========================================
              TITLE
          ========================================= */}

          <h1>
            Advanced Aptitude Completed!
          </h1>

          <p className="result-message">
            Your Advanced Aptitude
            test has been submitted
            successfully.
          </p>

          {/* =========================================
              SCORE RING
          ========================================= */}

          <div className="score-ring">

            <svg
              className="score-ring-svg"
              width="150"
              height="150"
              viewBox="0 0 150 150"
            >

              <circle
                className="score-ring-background"
                cx="75"
                cy="75"
                r="62"
              />

              <circle
                className="score-ring-progress"
                cx="75"
                cy="75"
                r="62"
                style={{
                  strokeDasharray:
                    circumference,

                  strokeDashoffset:
                    progressOffset,
                }}
              />

            </svg>

            <div className="score-ring-content">

              <strong>
                {scorePercentage}%
              </strong>

              <span>
                Score
              </span>

            </div>

          </div>

          {/* =========================================
              RESULT STATS
          ========================================= */}

          <div className="result-stats">

            <div className="result-stat correct-stat">

              <CheckCircle2 size={24} />

              <strong>
                {result.correct}
              </strong>

              <span>
                Correct
              </span>

            </div>

            <div className="result-stat wrong-stat">

              <XCircle size={24} />

              <strong>
                {result.incorrect}
              </strong>

              <span>
                Incorrect
              </span>

            </div>

            <div className="result-stat unanswered-stat">

              <Clock size={24} />

              <strong>
                {result.unanswered}
              </strong>

              <span>
                Unanswered
              </span>

            </div>

          </div>

          {/* =========================================
              AI PERFORMANCE ANALYSIS
          ========================================= */}

          <section className="ai-suggestions">

            <div className="ai-header">

              <div className="ai-icon">
                <Sparkles size={22} />
              </div>

              <div>
                <h2>
                  AI Performance Suggestions
                </h2>

                <p>
                  Personalized recommendations
                  based on your test performance
                </p>
              </div>

            </div>

            <div className="ai-suggestion-list">

              {aiSuggestions.map(
                (
                  suggestion,
                  index
                ) => {

                  const Icon =
                    suggestion.icon;

                  return (
                    <div
                      key={index}
                      className={`ai-suggestion ${suggestion.type}`}
                    >

                      <div className="suggestion-icon">
                        <Icon size={19} />
                      </div>

                      <div className="suggestion-content">

                        <h3>
                          {suggestion.title}
                        </h3>

                        <p>
                          {suggestion.text}
                        </p>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </section>

          {/* =========================================
              ACTION BUTTONS
          ========================================= */}

          <div className="result-buttons">

            <button
              className="retry-button"
              onClick={
                restartTest
              }
              disabled={
                submitting
              }
            >
              <RotateCcw
                size={18}
              />

              Retry Test
            </button>

            <button
              className="back-button"
              onClick={() =>
                navigate(
                  "/aptitude"
                )
              }
            >
              <ArrowLeft
                size={18}
              />

              Back to Aptitude
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // PROGRESS
  // =====================================================

  const answeredCount =
    Object.keys(
      answers
    ).length;

  const progress =
    totalQuestions > 0
      ? ((currentQuestion + 1) /
          totalQuestions) *
        100
      : 0;

  // =====================================================
  // MAIN TEST PAGE
  // =====================================================

  return (
    <div className="advanced-aptitude-page">

      {/* ===============================================
          HEADER
      =============================================== */}

      <header className="test-header">

        <div className="test-title">

          <Link
            to="/aptitude"
            className="back-link"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>

            <h1>
              Advanced Aptitude
            </h1>

            <p>
              Advanced quantitative,
              reasoning and logical
              puzzle practice
            </p>

          </div>

        </div>

        {/* =============================================
            HEADER ACTIONS
        ============================================= */}

        <div className="header-actions">

          {/* MOBILE SIDE PANEL TOGGLE */}
          <button
            type="button"
            className="mobile-panel-toggle-btn"
            onClick={() => setShowSidePanel((prev) => !prev)}
            aria-label="Toggle test overview panel"
          >
            <BarChart2 size={17} />
            <span>Overview</span>
          </button>

          {/* QUESTION MENU */}

          <div className="question-menu">

            <button
              type="button"
              className={`question-toggle ${
                showQuestionMenu
                  ? "open"
                  : ""
              }`}
              onClick={() =>
                setShowQuestionMenu(
                  (previous) =>
                    !previous
                )
              }
              aria-label="Open question numbers"
            >

              <span>
                {currentQuestion + 1}
              </span>

              <ChevronDown
                size={17}
              />

            </button>

            {showQuestionMenu && (
              <div className="question-dropdown">

                <div className="dropdown-header">

                  <div>

                    <strong>
                      Questions
                    </strong>

                    <span>
                      Question{" "}
                      {currentQuestion +
                        1}{" "}
                      of{" "}
                      {totalQuestions}
                    </span>

                  </div>

                  <span className="answered-count">
                    {answeredCount}{" "}
                    Answered
                  </span>

                </div>

                <div className="question-grid">

                  {aptitudeQuestions.map(
                    (
                      item,
                      index
                    ) => {

                      const isAnswered =
                        answers[
                          item._id
                        ] !==
                        undefined;

                      const isMarked =
                        markedQuestions.includes(
                          item._id
                        );

                      const isCurrent =
                        index ===
                        currentQuestion;

                      return (
                        <button
                          key={
                            item._id
                          }
                          type="button"
                          className={`question-number ${
                            isCurrent
                              ? "current"
                              : ""
                          } ${
                            isAnswered
                              ? "answered"
                              : ""
                          } ${
                            isMarked
                              ? "marked"
                              : ""
                          }`}
                          onClick={() =>
                            goToQuestion(
                              index
                            )
                          }
                        >
                          {index + 1}
                        </button>
                      );
                    }
                  )}

                </div>

                <div className="question-legend">

                  <span>
                    <i className="legend-current" />
                    Correct
                  </span>

                  <span>
                    <i className="legend-answered" />
                    Answered
                  </span>

                  <span>
                    <i className="legend-unanswered" />
                    Unanswered
                  </span>

                  <span>
                    <i className="legend-marked" />
                    Review
                  </span>

                </div>

              </div>
            )}

          </div>

          {/* TIMER */}

          <div
            className={`timer-box ${
              timeLeft <= 300
                ? "timer-warning"
                : ""
            }`}
          >

            <Clock size={22} />

            <div>

              <span>
                Time Remaining
              </span>

              <strong>
                {formatTime(
                  timeLeft
                )}
              </strong>

            </div>

          </div>

        </div>

      </header>

      {/* ===============================================
          PROGRESS BAR
      =============================================== */}

      <div className="test-progress">

        <div
          className="test-progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* ===============================================
          TEST LAYOUT
      =============================================== */}

      <main className="test-layout">

        {/* QUESTION SECTION */}

        <section className="question-section">

          <div className="question-card">

            <div className="question-top">

              <span className="question-count">
                Question{" "}
                {currentQuestion +
                  1}{" "}
                of{" "}
                {totalQuestions}
              </span>

              {question.topic && (
                <span className="topic-badge">
                  {question.topic}
                </span>
              )}

            </div>

            <h2 className="question-text">
              {question.question}
            </h2>

            {/* OPTIONS */}

            <div className="options-section">

              {question.options?.map(
                (
                  option,
                  index
                ) => {

                  const selected =
                    answers[
                      question._id
                    ] === option;

                  const letter =
                    String.fromCharCode(
                      65 + index
                    );

                  return (
                    <label
                      key={`${question._id}-${index}`}
                      className={`option-card ${
                        selected
                          ? "selected"
                          : ""
                      }`}
                    >

                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={
                          option
                        }
                        checked={
                          selected
                        }
                        onChange={() =>
                          handleAnswer(
                            option
                          )
                        }
                      />

                      <span className="option-letter">
                        {letter}
                      </span>

                      <span className="option-text">
                        {option}
                      </span>

                    </label>
                  );
                }
              )}

            </div>

            {/* ACTIONS */}

            <div className="question-actions">

              <button
                type="button"
                className="secondary-action"
                onClick={
                  goPrevious
                }
                disabled={
                  currentQuestion ===
                  0
                }
              >
                <ArrowLeft size={18} />

                Previous
              </button>

              <button
                type="button"
                className={`mark-action ${
                  markedQuestions.includes(
                    question._id
                  )
                    ? "marked"
                    : ""
                }`}
                onClick={
                  toggleMark
                }
              >

                <Flag size={18} />

                {markedQuestions.includes(
                  question._id
                )
                  ? "Unmark"
                  : "Mark for Review"}

              </button>

              {currentQuestion ===
              totalQuestions - 1 ? (

                <button
                  type="button"
                  className="submit-action"
                  onClick={
                    submitTest
                  }
                  disabled={
                    submitting
                  }
                >

                  {submitting
                    ? "Submitting..."
                    : "Submit Test"}

                  <CheckCircle2
                    size={18}
                  />

                </button>

              ) : (

                <button
                  type="button"
                  className="next-action"
                  onClick={
                    goNext
                  }
                >

                  Next

                  <ArrowRight
                    size={18}
                  />

                </button>

              )}

            </div>

          </div>

        </section>

        {/* =============================================
            RIGHT SIDEBAR
        ============================================= */}

        {/* Mobile side panel overlay */}
        {showSidePanel && (
          <div
            className="mobile-side-panel-overlay"
            onClick={() => setShowSidePanel(false)}
            aria-hidden="true"
          />
        )}

        <aside
          className={`question-sidebar ${
            showSidePanel ? "mobile-panel-open" : ""
          }`}
        >

          {/* Mobile Panel Header */}
          <div className="mobile-panel-header">
            <div className="mobile-panel-header-title">
              <BarChart2 size={18} />
              <span>Test Overview</span>
            </div>
            <button
              type="button"
              className="mobile-panel-close-btn"
              onClick={() => setShowSidePanel(false)}
              aria-label="Close side panel"
            >
              <X size={20} />
            </button>
          </div>

          <div className="sidebar-card">

            <h3>
              Test Overview
            </h3>

            <div className="overview-item">

              <span>
                Total Questions
              </span>

              <strong>
                {totalQuestions}
              </strong>

            </div>

            <div className="overview-item">

              <span>
                Answered
              </span>

              <strong>
                {answeredCount}
              </strong>

            </div>

            <div className="overview-item">

              <span>
                Marked
              </span>

              <strong>
                {markedQuestions.length}
              </strong>

            </div>

          </div>

          <div className="sidebar-card current-question-card">

            <div className="sidebar-question-title">

              <span>
                Question
              </span>

              <strong>
                {currentQuestion + 1}
              </strong>

              <small>
                of{" "}
                {totalQuestions}
              </small>

            </div>

            <div className="sidebar-progress">

              <div
                className="sidebar-progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <p>
              Use the question
              menu in the top-right
              corner to jump to any
              question.
            </p>

          </div>

        </aside>

      </main>

    </div>
  );
}

export default AdvancedAptitude;