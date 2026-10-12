import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  Brain,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Home,
  TrendingUp,
} from "lucide-react";

import "./AptitudeBasics.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AptitudeBasics() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [questions, setQuestions] = useState([]);

  const [answers, setAnswers] = useState({});

  const [timeLeft, setTimeLeft] = useState(30 * 60);

  const [submitted, setSubmitted] = useState(false);

  const [showQuestionNumbers, setShowQuestionNumbers] =
    useState(false);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [result, setResult] = useState(null);

  // Ref to always hold the latest submit handler without re-running timer effects.
  const submitRef = useRef(null);

  // =========================================================
  // FETCH QUESTIONS FROM BACKEND
  // =========================================================

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/questions?category=aptitude&section=basic&limit=60`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load questions"
          );
        }

        setQuestions(data.questions || []);
      } catch (error) {
        console.error("Question loading error:", error);

        setError(
          error.message ||
            "Unable to connect to the backend."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // =========================================================
  // TIMER (uses submitRef so the effect does not depend on the submit handler)
  // =========================================================

  useEffect(() => {
    if (
      submitted ||
      loading ||
      questions.length === 0
    ) {
      return;
    }

    if (timeLeft <= 0) {
      submitRef.current?.();
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
    loading,
    questions.length,
  ]);

  // =========================================================
  // FORMAT TIMER
  // =========================================================

  const hours = Math.floor(
    timeLeft / 3600
  );

  const minutes = Math.floor(
    (timeLeft % 3600) / 60
  );

  const seconds = timeLeft % 60;

  const formattedTime =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  // =========================================================
  // CURRENT QUESTION
  // =========================================================

  const question =
    questions[currentQuestion];

  // =========================================================
  // CURRENT ANSWER
  // =========================================================

  const selectedAnswer =
    answers[currentQuestion] || "";

  // =========================================================
  // SELECT ANSWER
  // =========================================================

  const handleAnswer = (answer) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: answer,
    }));
  };

  // =========================================================
  // PREVIOUS QUESTION
  // =========================================================

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );
    }
  };

  // =========================================================
  // NEXT QUESTION
  // =========================================================

  const handleNext = () => {
    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
    }
  };

  // =========================================================
  // SUBMIT TEST
  // =========================================================

  const handleSubmit = async () => {
    if (submitting || submitted) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // -------------------------------------------------------
      // CREATE ANSWER ARRAY
      // -------------------------------------------------------

      const submittedAnswers =
        questions.map(
          (item, index) => ({
            questionId: item._id,
            answer:
              answers[index] || "",
          })
        );

      // -------------------------------------------------------
      // CALCULATE TIME USED
      // -------------------------------------------------------

      const totalTime =
        30 * 60 - timeLeft;

      // -------------------------------------------------------
      // GET LOGIN TOKEN
      // -------------------------------------------------------

      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please login before submitting the test."
        );
      }

      // -------------------------------------------------------
      // SEND TEST TO BACKEND
      // -------------------------------------------------------

      const response = await fetch(
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
              "Basic Aptitude",

            category:
              "aptitude",

            section:
              "basic",

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

      // -------------------------------------------------------
      // GET BACKEND RESULT
      // -------------------------------------------------------

      const backendResult =
        data.result;

      setResult(
        backendResult
      );

      // -------------------------------------------------------
      // SAVE RESULT LOCALLY
      // -------------------------------------------------------

      localStorage.setItem(
        "aptitudeBasicsScore",
        backendResult.percentage
      );

      localStorage.setItem(
        "aptitudeBasicsCorrect",
        backendResult.correct
      );

      localStorage.setItem(
        "aptitudeBasicsIncorrect",
        backendResult.incorrect
      );

      localStorage.setItem(
        "aptitudeBasicsUnanswered",
        backendResult.unanswered
      );

      localStorage.setItem(
        "aptitudeBasicsTotal",
        backendResult.totalQuestions
      );

      localStorage.setItem(
        "aptitudeBasicsCompleted",
        "true"
      );

      // -------------------------------------------------------
      // SHOW RESULT
      // -------------------------------------------------------

      setSubmitted(true);

    } catch (error) {
      console.error(
        "Submit test error:",
        error
      );

      setError(
        error.message ||
          "Unable to submit test."
      );

    } finally {
      setSubmitting(false);
    }
  };

  // Keep ref pointing to the latest submit handler so the timer can call it.
  useEffect(() => {
    submitRef.current = handleSubmit;
  });

  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (loading) {
    return (
      <div className="basic-page">

        <div className="result-card">

          <div className="result-icon loading-icon">
            <Clock size={42} />
          </div>

          <h1>
            Loading Questions...
          </h1>

          <p>
            Please wait while we load your
            Basic Aptitude Test.
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // ERROR SCREEN
  // =========================================================

  if (
    error &&
    questions.length === 0
  ) {
    return (
      <div className="basic-page">

        <div className="result-card">

          <div className="result-icon error-icon">
            <XCircle size={42} />
          </div>

          <h1>
            Unable to Load Questions
          </h1>

          <p>
            {error}
          </p>

          <p>
            Make sure your backend is
            running on port 5000.
          </p>

          <Link
            to="/aptitude"
            className="result-button"
          >
            <Home size={18} />
            Back to Aptitude
          </Link>

        </div>

      </div>
    );
  }

  // =========================================================
  // NO QUESTIONS
  // =========================================================

  if (questions.length === 0) {
    return (
      <div className="basic-page">

        <div className="result-card">

          <div className="result-icon error-icon">
            <XCircle size={42} />
          </div>

          <h1>
            No Questions Available
          </h1>

          <p>
            No Basic Aptitude questions
            were found in the database.
          </p>

          <Link
            to="/aptitude"
            className="result-button"
          >
            <Home size={18} />
            Back to Aptitude
          </Link>

        </div>

      </div>
    );
  }

  // =========================================================
  // TEST COMPLETED
  // =========================================================

  if (
    submitted &&
    result
  ) {
    const percentage =
      Number(result.percentage || 0);

    // -------------------------------------------------------
    // PERFORMANCE LEVEL
    // -------------------------------------------------------

    let performanceTitle =
      "Needs More Practice";

    let performanceClass =
      "needs-practice";

    let performanceDescription =
      "Your fundamentals need more practice. Focus on accuracy first and then improve your solving speed.";

    if (percentage >= 80) {
      performanceTitle =
        "Excellent Performance";

      performanceClass =
        "excellent";

      performanceDescription =
        "You have demonstrated strong understanding of the aptitude concepts. Continue practicing timed questions to maintain your accuracy.";

    } else if (percentage >= 60) {
      performanceTitle =
        "Good Performance";

      performanceClass =
        "good";

      performanceDescription =
        "You have a good foundation. Focus on reducing mistakes and improving your solving speed.";

    } else if (percentage >= 40) {
      performanceTitle =
        "Needs Improvement";

      performanceClass =
        "average";

      performanceDescription =
        "You have some understanding of the concepts, but additional practice is required before attempting advanced placement tests.";
    }

    // -------------------------------------------------------
    // AI FEEDBACK
    // -------------------------------------------------------

    const aiSuggestions = [];

    if (
      result.unanswered > 0
    ) {
      aiSuggestions.push({
        icon: "⏱",
        title:
          "Improve Time Management",
        text:
          `You left ${result.unanswered} questions unanswered. Practice timed tests and avoid spending too long on a single question.`,
      });
    }

    if (
      result.incorrect > 0
    ) {
      aiSuggestions.push({
        icon: "🎯",
        title:
          "Review Incorrect Answers",
        text:
          `You answered ${result.incorrect} questions incorrectly. Review the concepts behind these mistakes instead of memorizing answers.`,
      });
    }

    if (
      percentage < 50
    ) {
      aiSuggestions.push({
        icon: "🧠",
        title:
          "Strengthen Fundamentals",
        text:
          "Start with basic quantitative aptitude, reasoning and problem-solving concepts before moving to advanced questions.",
      });
    } else {
      aiSuggestions.push({
        icon: "📈",
        title:
          "Increase Difficulty Gradually",
        text:
          "Once your accuracy becomes consistent, move from basic questions to medium and advanced placement-level problems.",
      });
    }

    aiSuggestions.push({
      icon: "💡",
      title:
        "Practice Consistently",
      text:
        "Complete short aptitude practice sessions regularly and track your accuracy and completion time after every test.",
    });

    // -------------------------------------------------------
    // ATTEMPTED QUESTIONS
    // -------------------------------------------------------

    const attempted =
      Number(result.correct || 0) +
      Number(result.incorrect || 0);

    // -------------------------------------------------------
    // ACCURACY
    // -------------------------------------------------------

    const accuracy =
      attempted > 0
        ? Math.round(
            (Number(result.correct || 0) /
              attempted) *
              100
          )
        : 0;

    // -------------------------------------------------------
    // COMPLETION
    // -------------------------------------------------------

    const completion =
      Number(result.totalQuestions || 0) > 0
        ? Math.round(
            (attempted /
              Number(result.totalQuestions)) *
              100
          )
        : 0;

    return (
      <div className="basic-page result-page">

        {/* =================================================
            RESULT HEADER
        ================================================= */}

        <header className="result-header">

          <div className="result-header-inner">

            <div className="result-brand">

              <div className="result-brand-icon">
                <Brain size={23} />
              </div>

              <div>

                <h2>
                  AI Interview Prep
                </h2>

                <span>
                  Performance Analysis
                </span>

              </div>

            </div>

            <Link
              to="/dashboard"
              className="result-dashboard-button"
            >
              <Home size={17} />
              Dashboard
            </Link>

          </div>

        </header>


        {/* =================================================
            RESULT CONTENT
        ================================================= */}

        <main className="result-main">

          {/* =================================================
              RESULT TITLE
          ================================================= */}

          <div className="result-heading">

            <div>

              <div className="result-eyebrow">
                TEST RESULT
              </div>

              <h1>
                Basic Aptitude Test
              </h1>

              <p>
                Your assessment has been completed.
                Review your performance and
                personalized AI suggestions below.
              </p>

            </div>

            <div className="completed-badge">
              <CheckCircle2 size={17} />
              Test Completed
            </div>

          </div>


          {/* =================================================
              SCORE CARD
          ================================================= */}

          <section className="professional-score-card">

            <div className="score-overview">

              {/* SCORE CIRCLE */}

              <div
                className="score-circle"
                style={{
                  background:
                    `conic-gradient(
                      #6256e8 ${percentage * 3.6}deg,
                      #e8eaf0 ${percentage * 3.6}deg
                    )`,
                }}
              >

                <div className="score-circle-inner">

                  <strong>
                    {percentage}%
                  </strong>

                  <span>
                    Overall Score
                  </span>

                </div>

              </div>


              {/* SCORE DETAILS */}

              <div className="score-details">

                <span className="score-label">
                  YOUR SCORE
                </span>

                <h2>
                  {result.correct}

                  <small>
                    {" "} /{" "}
                    {result.totalQuestions}
                  </small>
                </h2>

                <div
                  className={`performance-pill ${performanceClass}`}
                >

                  <TrendingUp size={15} />

                  {performanceTitle}

                </div>

                <p>
                  {performanceDescription}
                </p>

              </div>

            </div>


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="result-statistics">

              {/* CORRECT */}

              <div className="result-stat correct">

                <div className="stat-icon">
                  <CheckCircle2 size={20} />
                </div>

                <div>

                  <strong>
                    {result.correct}
                  </strong>

                  <span>
                    Correct
                  </span>

                </div>

              </div>


              {/* INCORRECT */}

              <div className="result-stat incorrect">

                <div className="stat-icon">
                  <XCircle size={20} />
                </div>

                <div>

                  <strong>
                    {result.incorrect}
                  </strong>

                  <span>
                    Incorrect
                  </span>

                </div>

              </div>


              {/* UNANSWERED */}

              <div className="result-stat unanswered">

                <div className="stat-icon">
                  <Clock size={20} />
                </div>

                <div>

                  <strong>
                    {result.unanswered}
                  </strong>

                  <span>
                    Unanswered
                  </span>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              AI FEEDBACK
          ================================================= */}

          <section className="ai-feedback-section">

            <div className="ai-feedback-heading">

              <div className="ai-heading-icon">
                <Brain size={22} />
              </div>

              <div>

                <h2>
                  AI Performance Feedback
                </h2>

                <p>
                  Personalized suggestions based on
                  your test performance.
                </p>

              </div>

            </div>


            <div className="ai-feedback-grid">

              {aiSuggestions.map(
                (suggestion, index) => (

                  <div
                    className="ai-feedback-card"
                    key={index}
                  >

                    <div className="feedback-icon">
                      {suggestion.icon}
                    </div>

                    <div>

                      <h3>
                        {suggestion.title}
                      </h3>

                      <p>
                        {suggestion.text}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </section>


          {/* =================================================
              AI INSIGHT
          ================================================= */}

          <section className="ai-insight">

            <div className="insight-icon">
              💡
            </div>

            <div>

              <h3>
                AI Insight
              </h3>

              <p>

                {percentage < 50
                  ? `Your current score of ${percentage}% indicates that you should focus on building strong fundamentals before attempting difficult placement questions. Your next target should be improving accuracy and reducing unanswered questions.`

                  : percentage < 80
                  ? `Your ${percentage}% score shows a developing aptitude foundation. Focus on the topics where you made mistakes and practice under a time limit to improve your placement readiness.`

                  : `Your ${percentage}% score demonstrates strong aptitude performance. Continue practicing advanced and timed questions so that your accuracy remains consistent under placement-test conditions.`}

              </p>

            </div>

          </section>


          {/* =================================================
              PERFORMANCE BREAKDOWN
          ================================================= */}

          <section className="performance-section">

            <div className="section-heading">

              <h2>
                Performance Breakdown
              </h2>

              <p>
                Your attempt summary
              </p>

            </div>


            <div className="breakdown-grid">

              {/* ACCURACY */}

              <div className="breakdown-card">

                <span className="breakdown-label">
                  ACCURACY
                </span>

                <strong>
                  {accuracy}%
                </strong>

                <p>
                  Accuracy among attempted
                  questions
                </p>

              </div>


              {/* COMPLETION */}

              <div className="breakdown-card">

                <span className="breakdown-label">
                  COMPLETION
                </span>

                <strong>
                  {completion}%
                </strong>

                <p>
                  Percentage of questions
                  attempted
                </p>

              </div>


              {/* QUESTIONS */}

              <div className="breakdown-card">

                <span className="breakdown-label">
                  QUESTIONS
                </span>

                <strong>
                  {result.totalQuestions}
                </strong>

                <p>
                  Total questions in this
                  assessment
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              NEXT STEPS
          ================================================= */}

          <section className="next-steps-section">

            <div className="section-heading">

              <h2>
                Recommended Next Steps
              </h2>

              <p>
                Follow these steps to improve
                your next aptitude attempt.
              </p>

            </div>


            <div className="next-steps-grid">

              {/* STEP 1 */}

              <div className="next-step-card">

                <div className="step-number">
                  01
                </div>

                <h3>
                  Review Concepts
                </h3>

                <p>
                  Revisit the concepts behind
                  your incorrect answers and
                  solve similar questions.
                </p>

              </div>


              {/* STEP 2 */}

              <div className="next-step-card">

                <div className="step-number">
                  02
                </div>

                <h3>
                  Practice Timed Questions
                </h3>

                <p>
                  Improve your speed by solving
                  short aptitude sets within
                  a fixed time.
                </p>

              </div>


              {/* STEP 3 */}

              <div className="next-step-card">

                <div className="step-number">
                  03
                </div>

                <h3>
                  Take Another Test
                </h3>

                <p>
                  Retake the assessment after
                  practice and compare your
                  new score.
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <div className="result-actions">

            <Link
              to="/aptitude"
              className="result-secondary-button"
            >
              <ChevronLeft size={18} />
              Back to Aptitude
            </Link>


            <Link
              to="/aptitude/basics"
              className="result-retry-button"
            >
              Try Again
            </Link>


            <Link
              to="/dashboard"
              className="result-primary-button"
            >
              <Home size={17} />
              Go to Dashboard
            </Link>

          </div>

        </main>

      </div>
    );
  }

  // =========================================================
  // PROGRESS
  // =========================================================

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  const answeredCount =
    Object.keys(answers).length;

  // =========================================================
  // MAIN TEST PAGE
  // =========================================================

  return (
    <div className="basic-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="basic-header">

        <div className="brand">

          <div className="brand-icon">
            <Brain size={27} />
          </div>

          <div>

            <h1>
              AI Interview Prep
            </h1>

            <span>
              Basic Aptitude Test
            </span>

          </div>

        </div>


        <div className="header-right">

          {/* =================================================
              QUESTION MENU
          ================================================= */}

          <div className="question-menu">

            <button
              type="button"
              className={`question-toggle ${
                showQuestionNumbers
                  ? "open"
                  : ""
              }`}
              onClick={() =>
                setShowQuestionNumbers(
                  (previous) =>
                    !previous
                )
              }
              aria-label="Show question numbers"
            >

              <span className="top-question-number">
                {currentQuestion + 1}
              </span>

              <ChevronRight
                size={17}
                className="question-arrow"
              />

            </button>


            {showQuestionNumbers && (
              <div className="question-dropdown">

                <div className="dropdown-header">

                  <div>

                    <strong>
                      Question Navigation
                    </strong>

                    <span>
                      Jump to any question
                    </span>

                  </div>

                  <span className="answered-count">

                    {answeredCount} /{" "}
                    {questions.length}

                  </span>

                </div>


                <div className="question-grid">

                  {questions.map(
                    (item, index) => {

                      const isCurrent =
                        currentQuestion ===
                        index;

                      const isAnswered =
                        answers[index] !==
                        undefined;

                      return (
                        <button
                          key={
                            item._id ||
                            item.id ||
                            index
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
                          }`}
                          onClick={() => {

                            setCurrentQuestion(
                              index
                            );

                            setShowQuestionNumbers(
                              false
                            );

                          }}
                        >
                          {index + 1}
                        </button>
                      );

                    }
                  )}

                </div>


                <div className="question-legend">

                  <span>
                    <i className="legend-current"></i>
                    Current
                  </span>

                  <span>
                    <i className="legend-answered"></i>
                    Answered
                  </span>

                  <span>
                    <i className="legend-unanswered"></i>
                    Unanswered
                  </span>

                </div>

              </div>
            )}

          </div>


          {/* =================================================
              TIMER
          ================================================= */}

          <div className="timer">

            <Clock size={18} />

            <span>
              {formattedTime}
            </span>

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="basic-main">

        {/* BACK BUTTON */}

        <Link
          to="/aptitude"
          className="back-link"
        >
          <ChevronLeft size={22} />
          Back to Aptitude
        </Link>


        {/* PAGE TITLE */}

        <div className="page-title">

          <h2>
            Basic Aptitude Round
          </h2>

          <p>
            Test your basic aptitude and
            problem-solving skills.
          </p>

        </div>


        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="progress-section">

          <div className="progress-info">

            <span>
              Test Progress
            </span>

            <span>
              {currentQuestion + 1} of{" "}
              {questions.length}
            </span>

          </div>


          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width:
                  `${progress}%`,
              }}
            />

          </div>

        </div>


        {/* =================================================
            SUBMIT ERROR
        ================================================= */}

        {error && (
          <div className="submit-error">
            {error}
          </div>
        )}


        {/* =================================================
            QUESTION CARD
        ================================================= */}

        <section className="question-card">

          <div className="question-label">

            Question{" "}
            {currentQuestion + 1}

          </div>


          {question.topic && (
            <div className="question-topic">
              Topic: {question.topic}
            </div>
          )}


          <h3>
            {question.question}
          </h3>


          {/* =================================================
              ANSWERS
          ================================================= */}

          <div className="answers">

            {question.options.map(
              (option, index) => {

                const letter =
                  String.fromCharCode(
                    65 + index
                  );

                const isSelected =
                  selectedAnswer ===
                  option;

                return (
                  <button
                    key={`${question._id}-${index}`}
                    type="button"
                    className={`answer ${
                      isSelected
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleAnswer(
                        option
                      )
                    }
                  >

                    <span className="answer-letter">
                      {letter}
                    </span>

                    <span className="answer-text">
                      {option}
                    </span>

                    {isSelected && (
                      <CheckCircle2
                        className="answer-check"
                        size={19}
                      />
                    )}

                  </button>
                );

              }
            )}

          </div>


          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="navigation">

            {/* PREVIOUS */}

            <button
              type="button"
              className="previous-button"
              onClick={
                handlePrevious
              }
              disabled={
                currentQuestion === 0
              }
            >

              <ChevronLeft size={18} />

              Previous

            </button>


            {/* NEXT / SUBMIT */}

            {currentQuestion ===
            questions.length - 1 ? (

              <button
                type="button"
                className="submit-button"
                onClick={
                  handleSubmit
                }
                disabled={
                  submitting
                }
              >

                {submitting
                  ? "Submitting..."
                  : "Submit Test"}

                {!submitting && (
                  <CheckCircle2
                    size={18}
                  />
                )}

              </button>

            ) : (

              <button
                type="button"
                className="next-button"
                onClick={
                  handleNext
                }
              >

                Next

                <ChevronRight
                  size={18}
                />

              </button>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default AptitudeBasics;