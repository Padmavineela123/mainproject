import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowRight,
  ArrowLeft,
  Brain,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Coffee,
  Home as HomeIcon,
  Laptop,
  LogOut,
  Menu,
  MessageSquare,
  Target,
  User,
  Settings,
  History,
  X,
  Flag,
} from "lucide-react";

import "./Technical.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// =====================================================
// TEST SETTINGS
// =====================================================

const TOTAL_TIME = 20 * 60;
const QUESTION_LIMIT = 25;

// =====================================================
// TECHNICAL COMPONENT
// =====================================================

function Technical() {
  const { section } = useParams();
  const navigate = useNavigate();

  // ===================================================
  // USER
  // ===================================================

  const [user] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("user") || "null"
      );
    } catch {
      return null;
    }
  });

  // ===================================================
  // SECTION NAME
  // ===================================================

  const sectionName = useMemo(() => {
    if (!section) {
      return null;
    }

    const value = section.toLowerCase();

    if (value === "c") {
      return "C";
    }

    if (value === "java") {
      return "Java";
    }

    if (value === "python") {
      return "Python";
    }

    if (value === "dsa") {
      return "DSA";
    }

    return null;
  }, [section]);

  // ===================================================
  // STATES
  // ===================================================

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showNavigation, setShowNavigation] =
    useState(false);
  const [sidebarOpen, setSidebarOpen] =
    useState(false);
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [profileMenuOpen, setProfileMenuOpen] =
    useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Reference to always hold the latest submit handler for the timer effect.
  const submitRef = useRef(null);

  // ===================================================
  // CURRENT QUESTION
  // ===================================================

  const currentQuestion =
    questions[currentIndex];

  // ===================================================
  // ANSWERED COUNT
  // ===================================================

  const answeredCount =
    Object.keys(answers).length;

  // ===================================================
  // FETCH QUESTIONS
  // ===================================================

  useEffect(() => {
    if (!sectionName) {
      return;
    }

    const fetchTechnicalQuestions =
      async () => {
        try {
          setLoading(true);
          setError("");

          const response = await fetch(
            `${API_URL}/api/questions?category=technical&section=${encodeURIComponent(
              sectionName
            )}&limit=${QUESTION_LIMIT}`
          );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data.message ||
                "Unable to fetch technical questions"
            );
          }

          const formattedQuestions =
            (data.questions || []).map(
              (question) => ({
                ...question,
                id: question._id,
              })
            );

          setQuestions(
            formattedQuestions
          );

          setCurrentIndex(0);
          setAnswers({});
          setTimeLeft(TOTAL_TIME);
        } catch (fetchError) {
          console.error(
            "Technical questions error:",
            fetchError
          );

          setError(
            fetchError.message ||
              "Unable to load technical questions"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchTechnicalQuestions();
  }, [sectionName]);

  // ===================================================
  // TIMER
  // ===================================================

  useEffect(() => {
    if (!sectionName) {
      return;
    }

    if (loading) {
      return;
    }

    if (!questions.length) {
      return;
    }

    if (timeLeft <= 0) {
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

    return () => {
      clearInterval(timer);
    };
  }, [
    sectionName,
    loading,
    questions.length,
    timeLeft,
  ]);

  // ===================================================
  // FORMAT TIMER
  // ===================================================

  const formatTime = (seconds) => {
    const hours = Math.floor(
      seconds / 3600
    );

    const minutes = Math.floor(
      (seconds % 3600) / 60
    );

    const secs = seconds % 60;

    return `${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  // ===================================================
  // SELECT ANSWER
  // ===================================================

  const handleAnswer = (answer) => {
    if (!currentQuestion) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: answer,
    }));
  };

  // ===================================================
  // NEXT
  // ===================================================

  const goNext = () => {
    if (
      currentIndex <
      questions.length - 1
    ) {
      setCurrentIndex(
        (previous) => previous + 1
      );
    }
  };

  // ===================================================
  // PREVIOUS
  // ===================================================

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(
        (previous) => previous - 1
      );
    }
  };

  // ===================================================
  // SUBMIT TEST
  // ===================================================

  const handleSubmit = async () => {
    if (!sectionName) {
      return;
    }

    if (!questions.length) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Please login before submitting the technical test."
        );

        navigate("/login");
        return;
      }

      const submittedAnswers =
        questions.map((question) => ({
          questionId:
            question._id ||
            question.id,

          answer:
            answers[question.id] || "",
        }));

      const totalTime =
        TOTAL_TIME - timeLeft;

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
              `${sectionName} Technical`,

            category:
              "technical",

            section:
              sectionName,

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
            "Unable to submit technical test"
        );
      }

      const result =
        data.result || {};

      const percentage =
        Number(result.percentage) || 0;

      const correct =
        Number(result.correct) || 0;

      const incorrect =
        Number(result.incorrect) || 0;

      const unanswered =
        Number(result.unanswered) || 0;

      const totalQuestions =
        Number(result.totalQuestions) ||
        questions.length;

      const answered =
        totalQuestions - unanswered;

      // =================================================
      // SAVE TECHNICAL RESULT
      // =================================================

      localStorage.setItem(
        "technicalScore",
        percentage
      );

      localStorage.setItem(
        "technicalCorrect",
        correct
      );

      localStorage.setItem(
        "technicalTotal",
        totalQuestions
      );

      localStorage.setItem(
        "technicalAnswered",
        answered
      );

      localStorage.setItem(
        "technicalIncorrect",
        incorrect
      );

      localStorage.setItem(
        "technicalUnanswered",
        unanswered
      );

      localStorage.setItem(
        "technicalSection",
        sectionName
      );

      localStorage.setItem(
        "technicalCompleted",
        "true"
      );

      // =================================================
      // SECTION RESULT
      // =================================================

      const sectionKey =
        sectionName.toLowerCase();

      localStorage.setItem(
        `technical${sectionKey}Score`,
        percentage
      );

      localStorage.setItem(
        `technical${sectionKey}Correct`,
        correct
      );

      localStorage.setItem(
        `technical${sectionKey}Total`,
        totalQuestions
      );

      localStorage.setItem(
        `technical${sectionKey}Completed`,
        "true"
      );

      // =================================================
      // TECHNICAL RESULT
      // =================================================

      const technicalResult = {
        section: sectionName,
        total: totalQuestions,
        answered,
        correct,
        incorrect,
        unanswered,
        percentage,
      };

      sessionStorage.setItem(
        "technicalResult",
        JSON.stringify(
          technicalResult
        )
      );

      // =================================================
      // FINAL RESULT
      // =================================================

      const finalResult = {
        ...result,

        testName:
          `${sectionName} Technical`,

        category:
          "technical",

        section:
          sectionName,

        totalQuestions,

        correct,

        incorrect,

        unanswered,

        answered,

        percentage,

        totalTime,

        feedback:
          result.feedback ||
          (
            percentage >= 80
              ? "Excellent performance. You have a strong understanding of the technical concepts covered in this test."
              : percentage >= 60
                ? "Good performance. You have a reasonable technical foundation, but some concepts need more practice."
                : "You need more practice with technical concepts. Review incorrect answers and strengthen your fundamentals."
          ),

        suggestions:
          result.suggestions?.length
            ? result.suggestions
            : (
                percentage >= 80
                  ? [
                      "Continue practicing advanced technical questions.",
                      "Strengthen DSA and problem-solving skills.",
                    ]
                  : percentage >= 60
                    ? [
                        "Review the questions you answered incorrectly.",
                        "Practice C, Java, Python and DSA concepts regularly.",
                      ]
                    : [
                        "Revise fundamental programming concepts.",
                        "Practice more placement-focused technical MCQs.",
                      ]
              ),
      };

      sessionStorage.setItem(
        "lastTestResult",
        JSON.stringify(
          finalResult
        )
      );

      navigate(
        "/test-result",
        {
          state: {
            result: finalResult,
          },
        }
      );
    } catch (submitError) {
      console.error(
        "Technical submit error:",
        submitError
      );

      alert(
        submitError.message ||
          "Unable to submit technical test."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keep ref pointing to the latest submit handler.
  useEffect(() => {
    submitRef.current = handleSubmit;
  });

  // ===================================================
  // AUTO SUBMIT
  // ===================================================

  useEffect(() => {
    if (!sectionName) {
      return;
    }

    if (!questions.length) {
      return;
    }

    if (timeLeft !== 0) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    submitRef.current?.();
  }, [
    timeLeft,
    sectionName,
    questions.length,
    isSubmitting,
  ]);

  // ===================================================
  // LANDING PAGE
  // ===================================================

  if (!section) {
    return (
      <div className="technical-layout">

        {/* HEADER */}

        <header className="technical-navbar">

          <div className="technical-logo-area">

            <div className="technical-logo">
              <Brain size={28} />
            </div>

            <div>
              <h2>
                AI Interview Prep
              </h2>
            </div>

          </div>

          <button
            className="technical-menu-button"
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <Menu size={25} />
          </button>

          <div className="technical-user-area">

            <div className="technical-notification">

              <span className="notification-number">
                3
              </span>

              🔔

            </div>

            <div className="technical-profile-wrapper">

              <button
                type="button"
                className="technical-profile-btn"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                aria-expanded={profileMenuOpen}
                aria-label="Open profile menu"
              >
                <div className="technical-avatar">
                  {(
                    user?.name ||
                    user?.email ||
                    "Student"
                  )
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="technical-user-text">
                  <strong>
                    {user?.name ||
                      "Student"}
                  </strong>
                  <span>
                    {user?.email ||
                      "Welcome!"}
                  </span>
                </div>

                <ChevronDown
                  size={18}
                  className={profileMenuOpen ? "technical-chevron open" : "technical-chevron"}
                />
              </button>

              {profileMenuOpen && (
                <div className="technical-profile-dropdown">

                  <div className="technical-dropdown-user">
                    <strong>{user?.name || "Student"}</strong>
                    <span>{user?.email || ""}</span>
                  </div>

                  <Link
                    to="/profile"
                    className="technical-dropdown-item"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <User size={17} />
                    Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="technical-dropdown-item"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <Settings size={17} />
                    Settings
                  </Link>

                  <button
                    type="button"
                    className="technical-dropdown-item technical-dropdown-logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={17} />
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>

        </header>

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="technical-sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* SIDEBAR */}

        <aside className={`technical-sidebar ${sidebarOpen ? "technical-sidebar-open" : ""}`}>

          {/* Mobile Header */}
          <div className="technical-mobile-sidebar-header">
            <div className="technical-mobile-sidebar-brand">
              <Brain size={26} />
              <span>AI Interview Prep</span>
            </div>
            <button
              type="button"
              className="technical-mobile-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="tech-nav">

            <Link
              to="/dashboard"
              className="tech-side-item"
              onClick={() => setSidebarOpen(false)}
            >
              <HomeIcon size={20} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/aptitude"
              className="tech-side-item"
              onClick={() => setSidebarOpen(false)}
            >
              <Target size={20} />
              <span>Aptitude</span>
            </Link>

            <Link
              to="/technical"
              className="tech-side-item tech-active"
              onClick={() => setSidebarOpen(false)}
            >
              <Code2 size={20} />
              <span>Technical</span>
            </Link>

            <Link
              to="/coding"
              className="tech-side-item"
              onClick={() => setSidebarOpen(false)}
            >
              <Laptop size={20} />
              <span>Coding</span>
            </Link>

            <Link
              to="/hr-interview"
              className="tech-side-item"
              onClick={() => setSidebarOpen(false)}
            >
              <MessageSquare size={20} />
              <span>HR Interview</span>
            </Link>

            <Link
              to="/results"
              className="tech-side-item"
              onClick={() => setSidebarOpen(false)}
            >
              <BarChart3 size={20} />
              <span>Results</span>
            </Link>

            <Link
              to="/practice-history"
              className="tech-side-item"
              onClick={() => setSidebarOpen(false)}
            >
              <History size={20} />
              <span>Practice History</span>
            </Link>

            <Link
              to="/profile"
              className="tech-side-item"
              onClick={() => setSidebarOpen(false)}
            >
              <User size={20} />
              <span>Profile</span>
            </Link>

            <Link
              to="/settings"
              className="tech-side-item"
              onClick={() => setSidebarOpen(false)}
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>

            <Link
              to="/login"
              className="tech-side-item tech-logout"
              onClick={() => {
                setSidebarOpen(false);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
              }}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </Link>

          </nav>

          {/* Journey Card */}
          <div className="tech-journey">
            <div className="tech-journey-icon">🏆</div>
            <p>Keep practicing and<br />improve your skills!</p>
            <Link to="/dashboard" className="tech-journey-btn">
              Back to Dashboard
            </Link>
          </div>

        </aside>

        {/* MAIN */}

        <main className="technical-content">

          <div className="technical-breadcrumb">

            <Link to="/dashboard">
              Dashboard
            </Link>

            <span>/</span>

            <strong>
              Technical
            </strong>

          </div>

          <section className="technical-hero">

            <div className="technical-hero-left">

              <div className="technical-hero-icon">
                <Code2 size={36} />
              </div>

              <div>

                <h1>
                  Technical Practice
                </h1>

                <p>
                  Test your technical knowledge
                  in programming languages and
                  data structures.
                </p>

              </div>

            </div>

            <div className="technical-hero-image">
              <Code2 size={80} />
            </div>

          </section>

          <div className="technical-section-title">

            <h2>
              Choose Your Technical Section
            </h2>

            <p>
              Select a programming language or
              data structures to begin your
              technical practice.
            </p>

          </div>

          <div className="technical-card-grid">

            {/* C */}

            <div className="technical-card c-card">

              <div className="technical-card-top">

                <div className="technical-card-icon">
                  {"{}"}
                </div>

                <span>
                  Timed Practice
                </span>

              </div>

              <h2>
                C Programming
              </h2>

              <Link
                to="/technical/c"
                className="technical-start-button"
              >
                <span>
                  Start C Practice
                </span>

                <ArrowRight size={17} />
              </Link>

            </div>

            {/* JAVA */}

            <div className="technical-card java-card">

              <div className="technical-card-top">

                <div className="technical-card-icon">
                  <Coffee size={29} />
                </div>

                <span>
                  Timed Practice
                </span>

              </div>

              <h2>
                Java Programming
              </h2>

              <Link
                to="/technical/java"
                className="technical-start-button"
              >
                <span>
                  Start Java Practice
                </span>

                <ArrowRight size={17} />
              </Link>

            </div>

            {/* PYTHON */}

            <div className="technical-card python-card">

              <div className="technical-card-top">

                <div className="technical-card-icon">
                  🐍
                </div>

                <span>
                  Timed Practice
                </span>

              </div>

              <h2>
                Python
              </h2>

              <Link
                to="/technical/python"
                className="technical-start-button"
              >
                <span>
                  Start Python Practice
                </span>

                <ArrowRight size={17} />
              </Link>

            </div>

            {/* DSA */}

            <div className="technical-card dsa-card">

              <div className="technical-card-top">

                <div className="technical-card-icon">
                  <Code2 size={29} />
                </div>

                <span>
                  Timed Practice
                </span>

              </div>

              <h2>
                Data Structures & Algorithms
              </h2>

              <Link
                to="/technical/dsa"
                className="technical-start-button"
              >
                <span>
                  Start DSA Practice
                </span>

                <ArrowRight size={17} />
              </Link>

            </div>

          </div>

        </main>

      </div>
    );
  }

  // ===================================================
  // INVALID SECTION
  // ===================================================

  if (!sectionName) {
    return (
      <div className="technical-empty">

        <h2>
          Invalid Technical Section
        </h2>

        <p>
          The selected technical section
          does not exist.
        </p>

        <Link to="/technical">
          <ArrowLeft size={18} />
          Back to Technical
        </Link>

      </div>
    );
  }

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="technical-empty">

        <div className="technical-loading-icon">
          <Code2 size={35} />
        </div>

        <h2>
          Loading {sectionName} questions...
        </h2>

        <p>
          Please wait while questions are
          loaded from the backend.
        </p>

      </div>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error) {
    return (
      <div className="technical-empty">

        <h2>
          Unable to load {sectionName} questions
        </h2>

        <p>
          {error}
        </p>

        <Link to="/technical">
          <ArrowLeft size={18} />
          Back to Technical
        </Link>

      </div>
    );
  }

  // ===================================================
  // NO QUESTIONS
  // ===================================================

  if (!questions.length) {
    return (
      <div className="technical-empty">

        <h2>
          No {sectionName} questions found.
        </h2>

        <p>
          Please check the technical questions
          in MongoDB.
        </p>

        <Link to="/technical">
          <ArrowLeft size={18} />
          Back to Technical
        </Link>

      </div>
    );
  }

  // ===================================================
  // QUESTION PAGE
  // ===================================================

  return (
    <div className="technical-layout">

      {/* QUESTION HEADER */}

      <header className="technical-navbar">

        <div className="technical-logo-area">

          <div className="technical-logo">
            <Brain size={28} />
          </div>

          <div>

            <h2>
              AI Interview Prep
            </h2>

            <span>
              {sectionName} Technical Round
            </span>

          </div>

        </div>

        <div className="technical-user-area">

          <div className="technical-timer">

            <Clock size={20} />

            <div>

              <small>
                Time Remaining
              </small>

              <strong>
                {formatTime(timeLeft)}
              </strong>

            </div>

          </div>

          <button
            type="button"
            className="question-menu-button"
            onClick={() =>
              setShowNavigation(
                (previous) =>
                  !previous
              )
            }
          >

            {showNavigation ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}

          </button>

        </div>

      </header>

      {/* QUESTION NAVIGATION */}

      {showNavigation && (
        <aside className="technical-question-panel">

          <div className="question-panel-header">

            <div>

              <h3>
                {sectionName} Questions
              </h3>

              <p>
                {answeredCount} of{" "}
                {questions.length} answered
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setShowNavigation(false)
              }
            >
              <X size={20} />
            </button>

          </div>

          {/* STATUS LEGEND */}

          <div className="question-status-legend">

            <div className="legend-item">

              <span className="legend-dot correct"></span>

              <span>
                Correct
              </span>

            </div>

            <div className="legend-item">

              <span className="legend-dot answered"></span>

              <span>
                Answered
              </span>

            </div>

            <div className="legend-item">

              <span className="legend-box unanswered"></span>

              <span>
                Unanswered
              </span>

            </div>

            <div className="legend-item">

              <span className="legend-dot review"></span>

              <span>
                Review
              </span>

            </div>

          </div>

          {/* =====================================================
    QUESTION NAVIGATION
===================================================== */}

{showNavigation && (
  <aside className="technical-question-panel">

    {/* PANEL HEADER */}
    <div className="question-panel-header">

      <div>
        <h3>
          {sectionName} Questions
        </h3>

        <p>
          {answeredCount} of {questions.length} answered
        </p>
      </div>

      <button
        type="button"
        onClick={() => setShowNavigation(false)}
      >
        <X size={20} />
      </button>

    </div>

    {/* =================================================
        QUESTION NUMBERS
    ================================================= */}

    <div className="technical-question-grid">

      {questions.map((question, index) => (

        <button
          type="button"
          key={question.id}
          className={`
            technical-question-number
            ${
              index === currentIndex
                ? "active"
                : ""
            }
            ${
              answers[question.id]
                ? "answered"
                : ""
            }
          `}
          onClick={() => {

            setCurrentIndex(index);

            setShowNavigation(false);

          }}
        >
          {index + 1}
        </button>

      ))}

    </div>

    {/* =================================================
        QUESTION STATUS LEGEND
        MOVED BELOW QUESTION NUMBERS
    ================================================= */}

    <div className="question-status-legend">

      <div className="legend-item">

        <span className="legend-dot correct"></span>

        <span>
          Correct
        </span>

      </div>

      <div className="legend-item">

        <span className="legend-dot answered"></span>

        <span>
          Answered
        </span>

      </div>

      <div className="legend-item">

        <span className="legend-box unanswered"></span>

        <span>
          Unanswered
        </span>

      </div>

      <div className="legend-item">

        <span className="legend-dot review"></span>

        <span>
          Review
        </span>

      </div>

    </div>

  </aside>
)}

        </aside>
      )}

      {/* MAIN QUESTION CONTENT */}

      <main className="technical-content technical-content--full">

        <div className="technical-breadcrumb">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <span>/</span>

          <Link to="/technical">
            Technical
          </Link>

          <span>/</span>

          <strong>
            {sectionName}
          </strong>

        </div>

        {/* QUESTION HERO */}

        <section className="technical-hero">

          <div className="technical-hero-left">

            <div className="technical-hero-icon">
              <Code2 size={36} />
            </div>

            <div>

              <h1>
                {sectionName} Technical Round
              </h1>

              <p>
                Practice {questions.length}{" "}
                {sectionName} interview questions.
              </p>

            </div>

          </div>

          <div className="technical-progress">

            <span>
              Progress
            </span>

            <strong>
              {currentIndex + 1} /{" "}
              {questions.length}
            </strong>

            <div className="progress-bar">

              <div
                style={{
                  width: `${
                    ((currentIndex + 1) /
                      questions.length) *
                    100
                  }%`,
                }}
              />

            </div>

          </div>

        </section>

        {/* QUESTION */}

        <section className="technical-question-card">

          <div className="question-card-top">

            <div>

              <span className="question-count">
                Question{" "}
                {currentIndex + 1} of{" "}
                {questions.length}
              </span>

              <span className="technical-section-badge">
                {sectionName}
              </span>

            </div>

            <span className="topic-name">
              {currentQuestion.topic ||
                "Technical"}
            </span>

          </div>

          <h2>
            {currentQuestion.question}
          </h2>

          <div className="technical-options">

            {(currentQuestion.options || []).map(
              (option, index) => {

                const letter =
                  String.fromCharCode(
                    65 + index
                  );

                const selected =
                  answers[
                    currentQuestion.id
                  ] === option;

                return (
                  <button
                    type="button"
                    key={`${currentQuestion.id}-${index}`}
                    className={`
                      technical-option
                      ${
                        selected
                          ? "selected"
                          : ""
                      }
                    `}
                    onClick={() =>
                      handleAnswer(option)
                    }
                  >

                    <span className="option-letter">
                      {letter}
                    </span>

                    <span className="option-value">
                      {option}
                    </span>

                    {selected && (
                      <CheckCircle2
                        size={21}
                        className="selected-check"
                      />
                    )}

                  </button>
                );
              }
            )}

          </div>

        </section>

        {/* BOTTOM CONTROLS */}

        <div className="technical-bottom">

          <button
            type="button"
            className="previous-button"
            onClick={goPrevious}
            disabled={currentIndex === 0}
          >

            <ArrowLeft size={18} />

            Previous

          </button>

          <div className="answer-status">

            <CheckCircle2 size={18} />

            {answeredCount} answered

          </div>

          {currentIndex ===
          questions.length - 1 ? (

            <button
              type="button"
              className="submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >

              <Flag size={18} />

              {isSubmitting
                ? "Submitting..."
                : "Submit Test"}

            </button>

          ) : (

            <button
              type="button"
              className="next-button"
              onClick={goNext}
            >

              Next

              <ArrowRight size={18} />

            </button>

          )}

        </div>

      </main>

    </div>
  );
}

export default Technical;