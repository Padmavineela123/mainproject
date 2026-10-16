import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Brain,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Flag,
  CheckCircle2,
  Circle,
} from "lucide-react";

import { verbalQuestions } from "../data/verbalQuestions";
import "./VerbalAptitude.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const ROUND_SIZE = 30;
const ROUND_TIME = 20 * 60;

export default function VerbalAptitude() {
  const navigate = useNavigate();
  const submitRef = useRef(null);

  /* =========================================================
     RANDOMIZE QUESTIONS
     Every new test session gets a different question order.
  ========================================================= */

  const questions = useMemo(() => {
    const copy = [...verbalQuestions];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, ROUND_SIZE);
  }, []);

  /* =========================================================
     STATES
  ========================================================= */

  const [index, setIndex] = useState(0);

  const [answers, setAnswers] = useState({});

  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [showQuestionPanel, setShowQuestionPanel] = useState(false);

  const question = questions[index];

  /* =========================================================
     TIMER
  ========================================================= */

  useEffect(() => {
    if (timeLeft <= 0) {
      submitRef.current?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((value) => Math.max(value - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* =========================================================
     FORMAT TIMER
  ========================================================= */

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  /* =========================================================
     CHECK ANSWER
  ========================================================= */

  const isCorrect = (item, value) => {
    if (
      value === undefined ||
      value === null ||
      String(value).trim() === ""
    ) {
      return false;
    }

    /* Fill in the blank */
    if (item.type === "fill") {
      const expected = Array.isArray(item.answer)
        ? item.answer
        : [item.answer];

      return expected.some(
        (answer) =>
          String(answer).trim().toLowerCase() ===
          String(value).trim().toLowerCase()
      );
    }

    /* Multiple-answer question */
    if (Array.isArray(item.answer)) {
      if (!Array.isArray(value)) return false;

      const expected = item.answer.map(String).sort();

      const selected = value.map(String).sort();

      return JSON.stringify(expected) === JSON.stringify(selected);
    }

    /* Normal single-answer question */
    return (
      String(value).trim().toLowerCase() ===
      String(item.answer).trim().toLowerCase()
    );
  };

  /* =========================================================
     SELECT ANSWER
  ========================================================= */

  const choose = (value) => {
    if (!question || submitting) return;

    /* Multiple-answer question (but NOT fill-in-the-blank) */
    if (Array.isArray(question.answer) && question.type !== "fill") {
      setAnswers((previous) => {
        const current = Array.isArray(previous[question.id])
          ? previous[question.id]
          : [];

        const exists = current.includes(value);

        const updated = exists
          ? current.filter((item) => item !== value)
          : [...current, value];

        return {
          ...previous,
          [question.id]: updated,
        };
      });

      return;
    }

    /* Single-answer / fill answer */
    setAnswers((previous) => ({
      ...previous,
      [question.id]: value,
    }));
  };

  /* =========================================================
     ANSWERED COUNT
  ========================================================= */

  const answeredCount = questions.filter((item) => {
    const answer = answers[item.id];

    if (Array.isArray(answer)) {
      return answer.length > 0;
    }

    return (
      answer !== undefined &&
      answer !== null &&
      String(answer).trim() !== ""
    );
  }).length;

  /* =========================================================
     SUBMIT TEST
  ========================================================= */

  async function submitTest() {
    if (submitting || !questions.length) return;

    setSubmitting(true);
    setError("");

    /* Calculate result */
    const correct = questions.reduce((total, item) => {
      return total + (isCorrect(item, answers[item.id]) ? 1 : 0);
    }, 0);

    const answered = questions.filter((item) => {
      const answer = answers[item.id];

      if (Array.isArray(answer)) {
        return answer.length > 0;
      }

      return (
        answer !== undefined &&
        answer !== null &&
        String(answer).trim() !== ""
      );
    }).length;

    const incorrect = Math.max(answered - correct, 0);

    const unanswered = questions.length - answered;

    const percentage = Math.round(
      (correct / questions.length) * 100
    );

    const totalTime = ROUND_TIME - timeLeft;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_URL}/api/tests/result`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            testName: "Verbal Aptitude",
            category: "verbal",
            section: "verbal",

            totalQuestions: questions.length,

            correct,
            incorrect,
            unanswered,

            percentage,

            totalTime,

            suggestions:
              percentage >= 80
                ? [
                    "Excellent verbal performance.",
                    "Continue practicing advanced verbal reasoning.",
                    "Try solving questions with less time.",
                  ]
                : percentage >= 60
                ? [
                    "Your verbal fundamentals are developing well.",
                    "Review incorrect answers carefully.",
                    "Practice vocabulary and sentence completion.",
                  ]
                : [
                    "Review vocabulary and grammar concepts.",
                    "Practice sentence completion regularly.",
                    "Use timed verbal practice to improve speed.",
                  ],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save verbal result."
        );
      }

      const result = {
        ...(data.result || {}),

        testName: "Verbal Aptitude",

        category: "verbal",

        section: "verbal",

        totalQuestions: questions.length,

        correct,

        incorrect,

        unanswered,

        percentage,

        totalTime,
      };

      /* Save result */
      sessionStorage.setItem(
        "lastTestResult",
        JSON.stringify(result)
      );

      /* Go to result page */
      navigate("/test-result", {
        state: {
          result,
        },
      });
    } catch (e) {
      setError(
        e.message || "Unable to submit verbal test."
      );

      setSubmitting(false);
    }
  }

  // Keep ref pointing to the latest submit handler.
  useEffect(() => {
    submitRef.current = submitTest;
  });

  /* =========================================================
     NAVIGATE TO QUESTION
  ========================================================= */

  const goToQuestion = (questionIndex) => {
    if (submitting) return;

    setIndex(questionIndex);

    setShowQuestionPanel(false);
  };

  /* =========================================================
     NEXT QUESTION
  ========================================================= */

  const nextQuestion = () => {
    setIndex((current) =>
      Math.min(current + 1, questions.length - 1)
    );
  };

  /* =========================================================
     PREVIOUS QUESTION
  ========================================================= */

  const previousQuestion = () => {
    setIndex((current) => Math.max(current - 1, 0));
  };

  /* =========================================================
     CHECK IF QUESTION IS ANSWERED
  ========================================================= */

  const isQuestionAnswered = (item) => {
    const answer = answers[item.id];

    if (Array.isArray(answer)) {
      return answer.length > 0;
    }

    return (
      answer !== undefined &&
      answer !== null &&
      String(answer).trim() !== ""
    );
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (!question) {
    return (
      <div className="verbal-page">
        <div className="verbal-loading-card">
          <Brain size={34} />

          <h1>Loading Verbal Aptitude...</h1>

          <p>
            Preparing your randomized set of questions.
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <div className="verbal-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="verbal-header">

        <div className="verbal-brand">

          <div className="verbal-brand-icon">
            <Brain size={24} />
          </div>

          <div>
            <strong>AI Interview Prep</strong>

            <small>
              Verbal Aptitude
            </small>
          </div>

        </div>


        <div className="verbal-header-right">

          {/* Question Navigator */}

          <div className="question-navigator">

            <button
              className="question-navigator-button"
              onClick={() =>
                setShowQuestionPanel(
                  (previous) => !previous
                )
              }
              disabled={submitting}
            >

              <span>
                Question {index + 1} / {questions.length}
              </span>

              {showQuestionPanel ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}

            </button>


            {/* Dropdown Question Panel */}

            {showQuestionPanel && (
              <div className="question-panel">

                <div className="question-panel-header">

                  <div>
                    <strong>
                      Question Navigator
                    </strong>

                    <small>
                      Jump to any question
                    </small>
                  </div>

                  <span>
                    {answeredCount}/{questions.length}
                  </span>

                </div>


                <div className="question-panel-grid">

                  {questions.map((item, questionIndex) => {

                    const answered =
                      isQuestionAnswered(item);

                    const current =
                      questionIndex === index;

                    return (
                      <button
                        key={item.id || questionIndex}
                        className={`
                          navigator-number
                          ${current ? "current" : ""}
                          ${answered ? "answered" : ""}
                        `}
                        onClick={() =>
                          goToQuestion(questionIndex)
                        }
                      >
                        {questionIndex + 1}
                      </button>
                    );
                  })}

                </div>


                <div className="question-panel-legend">

                  <span>
                    <i className="legend-dot current-dot" />
                    Correct
                  </span>

                  <span>
                    <i className="legend-dot answered-dot" />
                    Answered
                  </span>

                  <span>
                    <i className="legend-dot unanswered-dot" />
                    Unanswered
                  </span>

                </div>

              </div>
            )}

          </div>


          {/* Timer */}

          <div
            className={`verbal-timer ${
              timeLeft <= 60 ? "timer-warning" : ""
            }`}
          >

            <Clock size={18} />

            <strong>
              {formatTime(timeLeft)}
            </strong>

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="verbal-main">

        {/* Test Banner */}

        <section className="verbal-round-banner">

          <div>

            <h1>
              Verbal Ability Test
            </h1>

          </div>

        </section>


        {/* Question Card */}

        <section className="verbal-question-card">

          <div className="verbal-question-top">

            <span>
              Question {index + 1} of {questions.length}
            </span>

            <span>
              {question.topic || "Verbal"}
            </span>

          </div>


          {/* Question */}

          <h2>
            {question.question}
          </h2>


          {/* =================================================
              FILL IN THE BLANK
          ================================================= */}

          {question.type === "fill" ? (

            <div className="verbal-fill-wrapper">

              <label>
                Your Answer
              </label>

              <input
                className="verbal-fill-input"
                value={
                  answers[question.id] || ""
                }
                onChange={(e) =>
                  choose(e.target.value)
                }
                placeholder="Type your answer..."
                disabled={submitting}
              />

            </div>

          ) : (

            /* =================================================
               OPTIONS
            ================================================= */

            <div className="verbal-options">

              {(question.options || []).map(
                (option, optionIndex) => {

                  const currentAnswer =
                    answers[question.id];

                  const multipleAnswer =
                    Array.isArray(
                      question.answer
                    );

                  const selected =
                    multipleAnswer
                      ? Array.isArray(
                          currentAnswer
                        ) &&
                        currentAnswer.includes(
                          option
                        )
                      : currentAnswer === option;

                  return (
                    <button
                      key={optionIndex}
                      className={`
                        verbal-option
                        ${
                          selected
                            ? "selected"
                            : ""
                        }
                      `}
                      onClick={() =>
                        choose(option)
                      }
                      disabled={submitting}
                    >

                      <span className="option-letter">

                        {multipleAnswer ? (
                          selected ? (
                            <CheckCircle2
                              size={20}
                            />
                          ) : (
                            <Circle
                              size={20}
                            />
                          )
                        ) : (
                          String.fromCharCode(
                            65 + optionIndex
                          )
                        )}

                      </span>


                      <span className="option-text">
                        {option}
                      </span>


                      {selected &&
                        !multipleAnswer && (
                          <CheckCircle2
                            size={20}
                            className="selected-icon"
                          />
                        )}

                    </button>
                  );
                }
              )}

            </div>
          )}

        </section>


        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <div className="verbal-bottom">

          <button
            onClick={previousQuestion}
            disabled={
              index === 0 || submitting
            }
            className="navigation-button"
          >

            <ChevronLeft size={18} />

            Previous

          </button>


          <div className="verbal-progress-text">

            <strong>
              {answeredCount}
            </strong>

            <span>
              of {questions.length} answered
            </span>

          </div>


          {index === questions.length - 1 ? (

            <button
              className="verbal-submit"
              onClick={submitTest}
              disabled={submitting}
            >

              <Flag size={17} />

              {submitting
                ? "Submitting..."
                : "Submit Test"}

            </button>

          ) : (

            <button
              className="verbal-next"
              onClick={nextQuestion}
              disabled={submitting}
            >

              Next

              <ChevronRight size={18} />

            </button>

          )}

        </div>


        {/* Error */}

        {error && (
          <div className="verbal-error">
            {error}
          </div>
        )}

      </main>

    </div>
  );
}