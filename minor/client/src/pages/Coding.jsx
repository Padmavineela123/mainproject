import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Play,
  Send,
  XCircle,
} from "lucide-react";

import "./Coding.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const QUESTION_TIME = 20 * 60;

const languages = [
  "C",
  "Java",
  "Python",
];

const difficultyInfo = {
  Easy: "Foundational programming and beginner placement problems",

  Medium: "DSA, arrays, strings and placement patterns",

  Difficult: "Interview-level DSA and problem-solving patterns",

  Advanced: "Advanced algorithms, graphs, trees and optimization",
};

function Coding() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] =
    useState("Easy");

  const [codingProblems, setCodingProblems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedProblem, setSelectedProblem] =
    useState(null);

  const [language, setLanguage] =
    useState("C");

  const [code, setCode] =
    useState("");

  const [timeLeft, setTimeLeft] =
    useState(QUESTION_TIME);

  const [submitted, setSubmitted] =
    useState(false);

  const [runResult, setRunResult] =
    useState(null);

  const [solvedProblems, setSolvedProblems] =
    useState(() => {
      try {
        const stored = localStorage.getItem("solvedCodingProblems");
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    });

  const submitRef = useRef(null);

  /* =====================================================
     FETCH CODING PROBLEMS
  ===================================================== */

  useEffect(() => {
    const fetchCodingProblems = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/questions?category=coding&limit=80`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to fetch coding problems"
          );
        }

        const formattedProblems =
          (data.questions || []).map((problem) => {
            const difficultyValue =
              problem.difficulty
                ? problem.difficulty
                    .charAt(0)
                    .toUpperCase() +
                  problem.difficulty.slice(1)
                : "Easy";

            return {
              ...problem,

              id:
                problem._id ||
                problem.id,

              difficulty:
                difficultyValue,

              title:
                problem.title ||
                problem.question ||
                "",

              description:
                problem.description ||
                "",

              exampleInput:
                problem.exampleInput ||
                "",

              exampleOutput:
                problem.exampleOutput ||
                "",

              constraints:
                problem.constraints ||
                [],

              hint:
                problem.hint ||
                "",

              starterCode:
                problem.starterCode || {
                  C: "",
                  Java: "",
                  Python: "",
                },

              explanation:
                problem.explanation ||
                "",

              category:
                problem.topic ||
                "DSA & Placement",

              testCases:
                Array.isArray(problem.testCases)
                  ? problem.testCases
                  : [],
            };
          });

        setCodingProblems(
          formattedProblems
        );
      } catch (fetchError) {
        console.error(
          "Coding problems fetch error:",
          fetchError
        );

        setError(
          fetchError.message ||
            "Unable to load coding problems."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCodingProblems();
  }, []);

  /* =====================================================
     SYNC SOLVED PROBLEMS FROM HISTORY
  ===================================================== */

  useEffect(() => {
    const fetchSolvedFromHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_URL}/api/tests/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;
        const data = await response.json();
        const testList = data.tests || data.results || data.history || [];

        // Collect names or titles of coding tests where percentage === 100 or passed
        const solvedFromHistory = [];
        testList.forEach((item) => {
          if (
            item.category === "coding" &&
            (item.percentage === 100 || (item.correct > 0 && item.incorrect === 0))
          ) {
            // e.g. "Coding - Largest Element in Array" -> "Largest Element in Array"
            const title = (item.testName || "").replace(/^Coding\s*-\s*/i, "").trim();
            if (title) solvedFromHistory.push(title);
          }
        });

        if (solvedFromHistory.length > 0) {
          setSolvedProblems((prev) => {
            const combined = Array.from(new Set([...prev, ...solvedFromHistory]));
            try {
              localStorage.setItem("solvedCodingProblems", JSON.stringify(combined));
            } catch {
              // Ignore storage errors
            }
            return combined;
          });
        }
      } catch {
        // Silently catch network errors
      }
    };

    fetchSolvedFromHistory();
  }, []);

  /* =====================================================
     FILTER PROBLEMS
  ===================================================== */

  const filteredProblems = useMemo(() => {
    return codingProblems.filter(
      (problem) =>
        problem.difficulty === difficulty
    );
  }, [
    codingProblems,
    difficulty,
  ]);

  /* =====================================================
     TIMER
  ===================================================== */

  useEffect(() => {
    if (
      !selectedProblem ||
      submitted
    ) {
      return;
    }

    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [
    selectedProblem,
    timeLeft,
    submitted,
  ]);

  /* =====================================================
     AUTO SUBMIT (uses ref so the effect does not depend on handleSubmit)
  ===================================================== */

  useEffect(() => {
    if (!selectedProblem) {
      return;
    }

    if (
      timeLeft === 0 &&
      !submitted
    ) {
      submitRef.current?.();
    }
  }, [
    timeLeft,
    selectedProblem,
    submitted,
  ]);

  /* =====================================================
     TIMER FORMAT
  ===================================================== */

  const formatTime = (seconds) => {
    const minutes =
      Math.floor(seconds / 60);

    const secondsRemaining =
      seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(secondsRemaining).padStart(
      2,
      "0"
    )}`;
  };

  /* =====================================================
     DIFFICULTY
  ===================================================== */

  const handleDifficulty = (value) => {
    setDifficulty(value);
    setSelectedProblem(null);
    setSubmitted(false);
    setCode("");
    setRunResult(null);
    setError("");
    setTimeLeft(QUESTION_TIME);
  };

  /* =====================================================
     SELECT PROBLEM
  ===================================================== */

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);

    setLanguage("C");

    setCode(
      problem.starterCode?.C ||
        ""
    );

    setTimeLeft(QUESTION_TIME);

    setSubmitted(false);

    setRunResult(null);

    setError("");
  };

  /* =====================================================
     LANGUAGE
  ===================================================== */

  const handleLanguage = (value) => {
    if (!selectedProblem) {
      return;
    }

    setLanguage(value);

    setCode(
      selectedProblem
        .starterCode?.[value] ||
        ""
    );

    setSubmitted(false);

    setRunResult(null);
  };

  /* =====================================================
     BACK
  ===================================================== */

  const handleBack = () => {
    setSelectedProblem(null);
    setSubmitted(false);
    setCode("");
    setRunResult(null);
    setError("");
    setTimeLeft(QUESTION_TIME);
  };

  /* =====================================================
     RUN CODE
  ===================================================== */

  const handleRun = async () => {
    if (!selectedProblem) {
      return null;
    }

    const token =
      localStorage.getItem("token");

    if (!token) {
      const failure = {
        loading: false,
        success: false,
        compiled: false,
        output:
          "Please login before running code.",
        results: [],
        passed: 0,
        total: 0,
      };

      setRunResult(failure);
      return failure;
    }

    try {
      setError("");

      setRunResult({
        loading: true,
      });

      const response = await fetch(
        `${API_URL}/api/compiler/run`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            questionId:
              selectedProblem.id,

            language,

            code,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to run code."
        );
      }

      setRunResult(data);

      if (data.success && data.passed > 0 && data.failed === 0) {
        setSolvedProblems((prev) => {
          const problemKey = selectedProblem.title;
          if (!prev.includes(problemKey)) {
            const updated = [...prev, problemKey];
            try {
              localStorage.setItem("solvedCodingProblems", JSON.stringify(updated));
            } catch {
              // Ignore storage errors
            }
            return updated;
          }
          return prev;
        });
      }

      return data;
    } catch (runError) {
      console.error(
        "Run code error:",
        runError
      );

      const failure = {
        loading: false,

        success: false,

        compiled: false,

        output:
          runError.message ||
          "Compiler unavailable.",

        results: [],

        passed: 0,

        failed: 0,

        total: 0,
      };

      setRunResult(failure);

      return failure;
    }
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async () => {
    if (
      !selectedProblem ||
      submitted
    ) {
      return;
    }

    const evaluation =
      runResult &&
      !runResult.loading
        ? runResult
        : await handleRun();

    if (
      !evaluation ||
      evaluation.loading
    ) {
      return;
    }

    const total =
      Number(
        evaluation.total || 0
      );

    const passed =
      Number(
        evaluation.passed || 0
      );

    const percentage =
      total > 0
        ? Math.round(
            (passed / total) *
              100
          )
        : 0;

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      setError(
        "Please login before submitting."
      );

      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/tests/result`,
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
              `Coding - ${selectedProblem.title}`,

            category:
              "coding",

            section:
              selectedProblem.difficulty,

            totalQuestions:
              total || 1,

            correct:
              passed,

            incorrect:
              Math.max(
                total - passed,
                0
              ),

            unanswered:
              0,

            percentage,

            totalTime:
              QUESTION_TIME -
              timeLeft,

            suggestions:
              percentage < 50
                ? [
                    "Review the solution approach and failed test cases.",
                    "Practice more DSA and coding patterns.",
                  ]
                : [
                    "Review any failed test cases.",
                    "Continue solving timed placement coding problems.",
                  ],
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to save coding result."
        );
      }

      const result = {
        ...(data.result || {}),

        testName:
          `Coding - ${selectedProblem.title}`,

        totalQuestions:
          total || 1,

        correct:
          passed,

        incorrect:
          Math.max(
            total - passed,
            0
          ),

        unanswered:
          0,

        percentage,
      };

      sessionStorage.setItem(
        "lastTestResult",
        JSON.stringify(result)
      );

      localStorage.setItem(
        "codingScore",
        String(percentage)
      );

      localStorage.setItem(
        "codingCompleted",
        "true"
      );

      if (passed > 0 && passed === total) {
        setSolvedProblems((prev) => {
          const problemKey = selectedProblem.title;
          if (!prev.includes(problemKey)) {
            const updated = [...prev, problemKey];
            try {
              localStorage.setItem("solvedCodingProblems", JSON.stringify(updated));
            } catch {
              // Ignore storage errors
            }
            return updated;
          }
          return prev;
        });
      }

      setSubmitted(true);

      navigate("/test-result");
    } catch (submitError) {
      console.error(
        "Submit error:",
        submitError
      );

      setError(
        submitError.message ||
          "Unable to submit coding result."
      );
    }
  };

  // Keep ref pointing to the latest submit handler.
  useEffect(() => {
    submitRef.current = handleSubmit;
  });

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="coding-page">
        <header className="coding-header">
          <div className="coding-logo">
            <div className="coding-logo-icon">
              <Code2 size={24} />
            </div>

            <span>
              AI Interview Prep
            </span>
          </div>

          <div className="coding-header-right">
            <Link
              to="/dashboard"
              className="dashboard-link"
            >
              Dashboard
            </Link>
          </div>
        </header>

        <main className="coding-container">
          <section className="coding-hero">
            <div>
              <h1>
                Coding Practice
              </h1>

              <p>
                Loading coding problems...
              </p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error && !selectedProblem) {
    return (
      <div className="coding-page">
        <header className="coding-header">
          <div className="coding-logo">
            <div className="coding-logo-icon">
              <Code2 size={24} />
            </div>

            <span>
              AI Interview Prep
            </span>
          </div>

          <Link
            to="/dashboard"
            className="dashboard-link"
          >
            Dashboard
          </Link>
        </header>

        <main className="coding-container">
          <section className="coding-hero error-hero">
            <div>
              <h1>
                Coding Practice
              </h1>

              <p>{error}</p>

              <button
                onClick={() =>
                  window.location.reload()
                }
                className="retry-button"
              >
                Retry
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  /* =====================================================
     PROBLEM LIST
  ===================================================== */

  if (!selectedProblem) {
    return (
      <div className="coding-page">
        <header className="coding-header">
          <div className="coding-logo">
            <div className="coding-logo-icon">
              <Code2 size={24} />
            </div>

            <span>
              AI Interview Prep
            </span>
          </div>

          <div className="coding-header-right">
            <span className="coding-user-email">
              {(() => {
                try {
                  return (
                    JSON.parse(
                      localStorage.getItem(
                        "user"
                      ) || "null"
                    )?.email ||
                    "Student"
                  );
                } catch {
                  return "Student";
                }
              })()}
            </span>

            <Link
              to="/dashboard"
              className="dashboard-link"
            >
              Dashboard
            </Link>
          </div>
        </header>

        <main className="coding-container">
          <section className="coding-hero">
            <div>
              <h1>
                Coding Practice
              </h1>

              <p>
                Choose a difficulty and select a placement-focused problem.
              </p>
            </div>

            <div className="total-problems">
              <Code2 size={24} />

              <div>
                <strong>
                  DSA + Patterns + Algorithms
                </strong>
              </div>
            </div>
          </section>

          {/* DIFFICULTY */}

              {/* DIFFICULTY */}

<section className="difficulty-section">
  <h2>
    Choose Difficulty
  </h2>

  <div className="difficulty-grid">
    {Object.keys(difficultyInfo).map((item) => {
      return (
        <button
          key={item}
          className={`difficulty-card ${
            difficulty === item ? "active" : ""
          }`}
          onClick={() => handleDifficulty(item)}
        >
          <div className="difficulty-title">
            <span
              className={`difficulty-dot ${item.toLowerCase()}`}
            />

            <h3>
              {item}
            </h3>
          </div>

          <p>
            {difficultyInfo[item]}
          </p>
        </button>
      );
    })}
  </div>
</section>
          

          {/* PROBLEM LIST */}

          <section className="problem-section">
            <div className="problem-heading">
              <div>
                <h2>
                  {difficulty} Problems
                </h2>

                <p>
                  Select a problem to open the code editor.
                </p>
              </div>
            </div>

            <div className="problem-list">
              {filteredProblems.length === 0 ? (
                <div className="empty-problems">
                  No {difficulty.toLowerCase()} coding problems available.
                </div>
              ) : (
                filteredProblems.map((problem, index) => {
                    const isSolved = solvedProblems.includes(problem.title);
                    return (
                      <button
                        key={
                          problem.id
                        }
                        className={`problem-card ${isSolved ? "problem-solved" : ""}`}
                        onClick={() =>
                          handleProblemSelect(
                            problem
                          )
                        }
                      >
                        <div className="problem-number">
                          {index + 1}
                        </div>

                        <div className="problem-content">
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "7px" }}>
                            <h3 style={{ margin: 0 }}>
                              {
                                problem.title
                              }
                            </h3>

                            {isSolved ? (
                              <span
                                className="solved-badge"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  padding: "3px 9px",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  background: "rgba(34, 197, 94, 0.18)",
                                  color: "#4ade80",
                                  border: "1px solid rgba(34, 197, 94, 0.35)",
                                }}
                              >
                                ✓ Solved
                              </span>
                            ) : (
                              <span
                                className="unsolved-badge"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  padding: "3px 9px",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  background: "rgba(148, 163, 184, 0.12)",
                                  color: "#94a3b8",
                                  border: "1px solid rgba(148, 163, 184, 0.25)",
                                }}
                              >
                                Unsolved
                              </span>
                            )}
                          </div>

                          <p>
                            {
                              problem.description
                            }
                          </p>

                          <div className="problem-tags">
                            <span>
                              {
                                problem.category
                              }
                            </span>

                            <span>
                              {
                                problem.difficulty
                              }
                            </span>
                          </div>
                        </div>

                        <ArrowRight
                          size={22}
                        />
                      </button>
                    );
                  }
                )
              )}
            </div>
          </section>
        </main>
      </div>
    );
  }

  /* =====================================================
     CODE EDITOR
  ===================================================== */

  return (
    <div className="coding-page">
      <header className="coding-header">
        <div className="coding-logo">
          <div className="coding-logo-icon">
            <Code2 size={24} />
          </div>

          <span>
            AI Interview Prep
          </span>
        </div>

        <div className="timer-box">
          <Clock size={19} />

          <strong>
            {formatTime(timeLeft)}
          </strong>
        </div>
      </header>

      <main className="coding-workspace">
        <button
          className="back-problems"
          onClick={handleBack}
          disabled={submitted}
        >
          <ArrowLeft size={18} />

          Back to Problems
        </button>

        <div className="workspace-grid">

          {/* =================================================
             PROBLEM DETAILS
          ================================================= */}

          <section className="problem-details">
            <div className="detail-top">
              <span>
                Problem
              </span>

              <strong
                className={`detail-level ${selectedProblem.difficulty.toLowerCase()}`}
              >
                {
                  selectedProblem.difficulty
                }
              </strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "12px" }}>
              <h1 style={{ margin: 0 }}>
                {selectedProblem.title}
              </h1>

              {solvedProblems.includes(selectedProblem.title) ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    background: "rgba(34, 197, 94, 0.18)",
                    color: "#4ade80",
                    border: "1px solid rgba(34, 197, 94, 0.35)",
                  }}
                >
                  ✓ Solved
                </span>
              ) : (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    background: "rgba(148, 163, 184, 0.12)",
                    color: "#94a3b8",
                    border: "1px solid rgba(148, 163, 184, 0.25)",
                  }}
                >
                  Unsolved
                </span>
              )}
            </div>

            <p className="problem-description">
              {
                selectedProblem.description
              }
            </p>

            {/* EXAMPLE */}

            <div className="example-box">
              <h3>
                Example
              </h3>

              <p>
                <strong>
                  Input:
                </strong>{" "}
                {selectedProblem.exampleInput ||
                  "No example input"}
              </p>

              <p>
                <strong>
                  Output:
                </strong>{" "}
                {selectedProblem.exampleOutput ||
                  "No example output"}
              </p>
            </div>

            {/* CONSTRAINTS */}

            {selectedProblem.constraints?.length >
              0 && (
              <div className="constraints-box">
                <h3>
                  Constraints
                </h3>

                <ul>
                  {selectedProblem.constraints.map(
                    (
                      item,
                      index
                    ) => (
                      <li
                        key={index}
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* HINT */}

            {selectedProblem.hint && (
              <div className="hint-box">
                <h3>
                  Hint
                </h3>

                <p>
                  {
                    selectedProblem.hint
                  }
                </p>
              </div>
            )}
          </section>

          {/* =================================================
             EDITOR
          ================================================= */}

          <section className="editor-section">
            <div className="editor-header">
              <div>
                <h2>
                  Code Editor
                </h2>

                <p>
                  Select a language and write your solution.
                </p>
              </div>

              <div className="language-selector">
                <select
                  value={language}
                  onChange={(event) =>
                    handleLanguage(
                      event.target.value
                    )
                  }
                  disabled={submitted}
                >
                  {languages.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={17}
                />
              </div>
            </div>

            {/* EDITOR */}

            <div className="editor">
              <div className="editor-toolbar">
                <span>
                  {language}
                </span>

                <span>
                  {formatTime(
                    timeLeft
                  )}
                </span>
              </div>

              <textarea
                value={code}
                onChange={(event) =>
                  setCode(
                    event.target.value
                  )
                }
                className="code-area"
                spellCheck="false"
                disabled={submitted}
                placeholder="Write your solution here..."
              />
            </div>

            {/* BUTTONS */}

            <div className="editor-actions">
              <button
                className="run-button"
                onClick={handleRun}
                disabled={
                  submitted ||
                  runResult?.loading
                }
              >
                <Play size={18} />

                {runResult?.loading
                  ? "Running..."
                  : "Run Code"}
              </button>

              <button
                className="submit-button"
                onClick={() =>
                  handleSubmit(false)
                }
                disabled={
                  submitted ||
                  runResult?.loading
                }
              >
                <Send size={18} />

                {submitted
                  ? "Submitted"
                  : "Submit Code"}
              </button>
            </div>

            {/* ERROR */}

            {error &&
              selectedProblem && (
                <div className="coding-error">
                  {error}
                </div>
              )}

            {/* =================================================
               COMPILER RESULT
            ================================================= */}

            {runResult &&
              !runResult.loading && (
                <div
                  className={`compiler-result-box ${
                    runResult.success
                      ? "compiler-success"
                      : "compiler-failure"
                  }`}
                >
                  <div className="solution-title">
                    {runResult.success ? (
                      <CheckCircle2
                        size={22}
                      />
                    ) : (
                      <XCircle
                        size={22}
                      />
                    )}

                    <h3>
                      Compiler Result
                    </h3>
                  </div>

                  {runResult.compiled ===
                  false ? (
                    <pre className="compiler-error-output">
                      {runResult.output ||
                        runResult.error ||
                        "Compilation failed."}
                    </pre>
                  ) : (
                    <>
                      <p className="compiler-summary">
                        <strong>
                          {runResult.passed ||
                            0}
                        </strong>{" "}
                        of{" "}
                        <strong>
                          {runResult.total ||
                            0}
                        </strong>{" "}
                        test cases passed.
                      </p>

                      {runResult.failed >
                        0 && (
                        <p className="failed-summary">
                          {
                            runResult.failed
                          }{" "}
                          test case(s) failed.
                        </p>
                      )}

                      {runResult.executionTimeMs !== undefined && (
                        <p style={{ marginTop: "8px", fontSize: "12.5px", color: "#38bdf8", fontWeight: 700 }}>
                          ⏱ Total Execution Time: {runResult.executionTimeMs} ms
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}

            {/* =================================================
               TEST CASE RESULTS
            ================================================= */}

            {runResult &&
              !runResult.loading && (
                <div className="test-cases-box">
                  <div className="test-cases-header">
                    <h3>
                      Test Cases
                    </h3>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {runResult.executionTimeMs !== undefined && (
                        <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>
                          Runtime: {runResult.executionTimeMs} ms
                        </span>
                      )}

                      <span className="test-summary">
                        {runResult.passed ||
                          0}{" "}
                        /{" "}
                        {runResult.total ||
                          0}{" "}
                        Passed
                      </span>
                    </div>
                  </div>

                  {runResult.results &&
                  runResult.results.length >
                    0 ? (
                    runResult.results.map(
                      (
                        test,
                        index
                      ) => (
                        <div
                          className={`coding-test-case ${
                            test.passed
                              ? "test-passed"
                              : "test-failed"
                          }`}
                          key={index}
                        >
                          <div className="test-case-header">
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <strong>
                                Test Case{" "}
                                {test.testCase ||
                                  index +
                                    1}
                              </strong>

                              {test.executionTimeMs !== undefined && (
                                <small style={{ color: "#94a3b8", fontSize: "11px", fontWeight: 600 }}>
                                  ({test.executionTimeMs} ms)
                                </small>
                              )}
                            </div>

                            <span
                              className={
                                test.passed
                                  ? "case-pass"
                                  : "case-fail"
                              }
                            >
                              {test.passed
                                ? "✓ Passed"
                                : "✕ Failed"}
                            </span>
                          </div>

                          <div className="test-output-block">
                            <strong>
                              Input
                            </strong>

                            <pre>
                              {test.input ||
                                "(No input)"}
                            </pre>
                          </div>

                          <div className="test-output-block">
                            <strong>
                              Expected Output
                            </strong>

                            <pre>
                              {test.expected ||
                                "(No expected output)"}
                            </pre>
                          </div>

                          <div className="test-output-block">
                            <strong>
                              Your Output
                            </strong>

                            <pre>
                              {test.actual ||
                                "(No output)"}
                            </pre>
                          </div>

                          {test.error && (
                            <div className="test-error">
                              <strong>
                                Error
                              </strong>

                              <pre>
                                {
                                  test.error
                                }
                              </pre>
                            </div>
                          )}
                        </div>
                      )
                    )
                  ) : (
                    <div className="no-test-results">
                      No test case results available.
                    </div>
                  )}
                </div>
              )}

            {/* =================================================
               SUBMITTED
            ================================================= */}

            {submitted && (
              <div className="solution-box">
                <div className="solution-title">
                  <CheckCircle2
                    size={22}
                  />

                  <h3>
                    Submission Complete
                  </h3>
                </div>

                <p>
                  Your coding result has been saved. View the AI feedback report for suggestions.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Coding;