import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Brain,
  Home,
  Target,
  Code2,
  Laptop,
  MessageSquare,
  History,
  User,
  Settings,
  LogOut,
  Clock,
  Trophy,
  ChevronRight,
  RefreshCw,
  Menu,
  X,
  CheckCircle2,
  XCircle,
  MinusCircle,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import "./PracticeHistory.css";


const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";


function PracticeHistory() {

  const navigate = useNavigate();


  // =====================================================
  // STATE
  // =====================================================

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);


  // =====================================================
  // GET HISTORY
  // =====================================================

  const fetchHistory = async () => {

    try {

      setLoading(true);
      setError("");


      const token =
        localStorage.getItem("token");


      if (!token) {

        navigate("/login");

        return;

      }


      const response =
        await fetch(
          `${API_URL}/api/tests/history`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        if (
          response.status === 401
        ) {

          localStorage.removeItem(
            "token"
          );

          navigate("/login");

          return;

        }

        throw new Error(
          data.message ||
          "Unable to fetch practice history"
        );

      }


      setResults(
        Array.isArray(data.results)
          ? data.results
          : []
      );

    } catch (err) {

      console.error(
        "Practice history error:",
        err
      );

      setError(
        err.message ||
        "Unable to load practice history"
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // LOAD HISTORY
  // =====================================================

  useEffect(() => {

    fetchHistory();

  }, []);


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "Date unavailable";
    }


    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (date) => {

    if (!date) {
      return "";
    }


    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  };


  // =====================================================
  // FORMAT DURATION
  // =====================================================

  const formatDuration = (seconds) => {

    const value =
      Number(seconds) || 0;


    if (value <= 0) {
      return "Time not recorded";
    }


    const minutes =
      Math.floor(value / 60);

    const remainingSeconds =
      value % 60;


    if (minutes === 0) {

      return `${remainingSeconds}s`;

    }


    if (remainingSeconds === 0) {

      return `${minutes} min`;

    }


    return `${minutes} min ${remainingSeconds}s`;

  };


  // =====================================================
  // PERFORMANCE LABEL
  // =====================================================

  const getPerformance = (percentage) => {

    const score =
      Number(percentage) || 0;


    if (score >= 85) {

      return {
        label: "Excellent",
        className: "excellent",
      };

    }


    if (score >= 75) {

      return {
        label: "Very Good",
        className: "very-good",
      };

    }


    if (score >= 60) {

      return {
        label: "Good",
        className: "good",
      };

    }


    if (score >= 40) {

      return {
        label: "Needs Practice",
        className: "needs-practice",
      };

    }


    return {
      label: "Needs Improvement",
      className: "needs-improvement",
    };

  };


  // =====================================================
  // CATEGORY ICON
  // =====================================================

  const getCategoryIcon = (category) => {

    switch (
      String(category || "").toLowerCase()
    ) {

      case "aptitude":
        return <Target size={22} />;

      case "technical":
        return <Laptop size={22} />;

      case "coding":
        return <Code2 size={22} />;

      case "hr":
        return <MessageSquare size={22} />;

      case "verbal":
        return <MessageSquare size={22} />;

      default:
        return <Brain size={22} />;

    }

  };


  // =====================================================
  // CATEGORY NAME
  // =====================================================

  const getCategoryName = (category) => {

    switch (
      String(category || "").toLowerCase()
    ) {

      case "aptitude":
        return "Aptitude";

      case "technical":
        return "Technical";

      case "coding":
        return "Coding";

      case "hr":
        return "HR Interview";

      case "verbal":
        return "Verbal";

      default:
        return category || "Practice Test";

    }

  };


  // =====================================================
  // SECTION NAME
  // =====================================================

  const getSectionName = (result) => {

    if (!result.section) {
      return "";
    }


    if (
      result.category === "technical"
    ) {

      return result.section;

    }


    const section =
      String(result.section);


    return section.charAt(0).toUpperCase() +
      section.slice(1);

  };


  // =====================================================
  // STATS
  // =====================================================

  const statistics = useMemo(() => {

    const completedTests =
      results.length;


    const totalQuestions =
      results.reduce(
        (sum, item) =>
          sum +
          (Number(
            item.totalQuestions
          ) || 0),
        0
      );


    const totalCorrect =
      results.reduce(
        (sum, item) =>
          sum +
          (Number(
            item.correct
          ) || 0),
        0
      );


    const averageScore =
      completedTests > 0
        ? Math.round(
            results.reduce(
              (sum, item) =>
                sum +
                (Number(
                  item.percentage
                ) || 0),
              0
            ) /
              completedTests
          )
        : 0;


    return {
      completedTests,
      totalQuestions,
      totalCorrect,
      averageScore,
    };

  }, [results]);


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

  };


  // =====================================================
  // CLOSE SIDEBAR
  // =====================================================

  const closeSidebar = () => {

    setSidebarOpen(false);

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="history-loading">

        <div className="history-loader">

          <RefreshCw
            size={30}
            className="spin"
          />

        </div>

        <h3>
          Loading Practice History...
        </h3>

        <p>
          Fetching your completed tests.
        </p>

      </div>

    );

  }


  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (

    <div className="history-page">


      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {sidebarOpen && (

        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />

      )}


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`history-sidebar ${
          sidebarOpen
            ? "sidebar-open"
            : ""
        }`}
      >

        <div className="sidebar-logo">

          <Brain size={30} />

          <span>
            AI Interview Prep
          </span>

          <button
            className="mobile-close"
            onClick={closeSidebar}
          >
            <X size={22} />
          </button>

        </div>


        <nav className="history-nav">

          <Link
            to="/dashboard"
            className="history-nav-item"
          >
            <Home size={20} />

            <span>
              Dashboard
            </span>
          </Link>


          <Link
            to="/aptitude"
            className="history-nav-item"
          >
            <Target size={20} />

            <span>
              Aptitude
            </span>
          </Link>


          <Link
            to="/technical"
            className="history-nav-item"
          >
            <Laptop size={20} />

            <span>
              Technical
            </span>
          </Link>


          <Link
            to="/coding"
            className="history-nav-item"
          >
            <Code2 size={20} />

            <span>
              Coding
            </span>
          </Link>


          <Link
            to="/hr"
            className="history-nav-item"
          >
            <MessageSquare size={20} />

            <span>
              HR Interview
            </span>
          </Link>


          <Link
            to="/practice-history"
            className="history-nav-item active"
          >
            <History size={20} />

            <span>
              Practice History
            </span>
          </Link>

          <Link
            to="/profile"
            className="history-nav-item"
          >
            <User size={20} />

            <span>
              Profile
            </span>
          </Link>

          <Link
            to="/settings"
            className="history-nav-item"
          >
            <Settings size={20} />

            <span>
              Settings
            </span>
          </Link>

          <button
            className="history-nav-item logout-button"
            onClick={handleLogout}
          >
            <LogOut size={20} />

            <span>
              Logout
            </span>
          </button>

        </nav>

      </aside>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="history-main">


        {/* =================================================
            HEADER
        ================================================= */}

        <header className="history-header">

          <button
            className="mobile-menu"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <Menu size={24} />
          </button>


          <div>

            <h1>
              Practice History
            </h1>

            <p>
              Track your completed interview
              preparation tests.
            </p>

          </div>


          <button
            className="refresh-button"
            onClick={fetchHistory}
          >
            <RefreshCw size={18} />

            <span>
              Refresh
            </span>
          </button>

        </header>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="history-error">

            <XCircle size={20} />

            <span>
              {error}
            </span>

            <button
              onClick={fetchHistory}
            >
              Try Again
            </button>

          </div>

        )}


        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="history-stats">


          <div className="history-stat-card">

            <div className="stat-icon">

              <History size={22} />

            </div>

            <div>

              <span>
                Tests Completed
              </span>

              <strong>
                {statistics.completedTests}
              </strong>

            </div>

          </div>


          <div className="history-stat-card">

            <div className="stat-icon">

              <Target size={22} />

            </div>

            <div>

              <span>
                Questions Attempted
              </span>

              <strong>
                {statistics.totalQuestions}
              </strong>

            </div>

          </div>


          <div className="history-stat-card">

            <div className="stat-icon">

              <CheckCircle2 size={22} />

            </div>

            <div>

              <span>
                Correct Answers
              </span>

              <strong>
                {statistics.totalCorrect}
              </strong>

            </div>

          </div>


          <div className="history-stat-card">

            <div className="stat-icon">

              <Trophy size={22} />

            </div>

            <div>

              <span>
                Average Score
              </span>

              <strong>
                {statistics.averageScore}%
              </strong>

            </div>

          </div>


        </section>


        {/* =================================================
            HISTORY LIST
        ================================================= */}

        <section className="history-section">

          <div className="history-section-heading">

            <div>

              <h2>
                Completed Tests
              </h2>

              <p>
                Your latest practice attempts
              </p>

            </div>

            <span className="history-count">

              {results.length}{" "}
              {results.length === 1
                ? "Test"
                : "Tests"}

            </span>

          </div>


          {results.length === 0 ? (

            <div className="history-empty">

              <div className="empty-icon">

                <History size={38} />

              </div>

              <h3>
                No Practice History Yet
              </h3>

              <p>
                Complete an aptitude,
                technical, coding, or HR
                test to see your results here.
              </p>

              <Link
                to="/dashboard"
                className="empty-button"
              >
                Start Practicing
                <ChevronRight size={18} />
              </Link>

            </div>

          ) : (

            <div className="history-list">

              {results.map(
                (result, index) => {

                  const performance =
                    getPerformance(
                      result.percentage
                    );


                  const score =
                    Number(
                      result.percentage
                    ) || 0;


                  return (

                    <article
                      className="history-card"
                      key={
                        result._id ||
                        result.id ||
                        index
                      }
                    >


                      {/* CARD LEFT */}

                      <div className="history-card-left">


                        <div className="history-category-icon">

                          {getCategoryIcon(
                            result.category
                          )}

                        </div>


                        <div className="history-card-info">

                          <div className="history-card-title-row">

                            <h3>
                              {
                                result.testName ||
                                getCategoryName(
                                  result.category
                                )
                              }
                            </h3>

                            <span
                              className={`performance-badge ${performance.className}`}
                            >
                              {
                                performance.label
                              }
                            </span>

                          </div>


                          <div className="history-card-meta">

                            <span>
                              {
                                getCategoryName(
                                  result.category
                                )
                              }
                            </span>


                            {result.section && (

                              <>
                                <span className="meta-dot">
                                  •
                                </span>

                                <span>
                                  {
                                    getSectionName(
                                      result
                                    )
                                  }
                                </span>

                              </>

                            )}


                            <span className="meta-dot">
                              •
                            </span>

                            <span>
                              {
                                formatDate(
                                  result.createdAt
                                )
                              }
                            </span>


                            <span className="meta-dot">
                              •
                            </span>

                            <span>
                              {
                                formatTime(
                                  result.createdAt
                                )
                              }
                            </span>

                          </div>


                          <div className="history-card-details">


                            <div className="detail-item">

                              <CheckCircle2
                                size={16}
                              />

                              <span>
                                Correct
                              </span>

                              <strong>
                                {
                                  result.correct ??
                                  0
                                }
                              </strong>

                            </div>


                            <div className="detail-item">

                              <XCircle
                                size={16}
                              />

                              <span>
                                Incorrect
                              </span>

                              <strong>
                                {
                                  result.incorrect ??
                                  0
                                }
                              </strong>

                            </div>


                            <div className="detail-item">

                              <MinusCircle
                                size={16}
                              />

                              <span>
                                Unanswered
                              </span>

                              <strong>
                                {
                                  result.unanswered ??
                                  0
                                }
                              </strong>

                            </div>


                            <div className="detail-item">

                              <Clock
                                size={16}
                              />

                              <span>
                                Time
                              </span>

                              <strong>
                                {
                                  formatDuration(
                                    result.totalTime
                                  )
                                }
                              </strong>

                            </div>

                          </div>

                        </div>

                      </div>


                      {/* CARD RIGHT */}

                      <div className="history-score">

                        <div
                          className="score-circle"
                          style={{
                            "--score":
                              `${score}%`,
                          }}
                        >

                          <div className="score-circle-inner">

                            <strong>
                              {score}%
                            </strong>

                            <span>
                              Score
                            </span>

                          </div>

                        </div>


                        <div className="score-total">

                          <strong>
                            {
                              result.correct ??
                              0
                            }
                            /
                            {
                              result.totalQuestions ??
                              0
                            }
                          </strong>

                          <span>
                            Correct
                          </span>

                        </div>


                        <button
                          className="view-result-button"
                          onClick={() => {

                            localStorage.setItem(
                              "selectedResult",
                              JSON.stringify(
                                result
                              )
                            );

                            navigate(
                              "/result"
                            );

                          }}
                        >

                          View Details

                          <ChevronRight
                            size={18}
                          />

                        </button>

                      </div>


                    </article>

                  );

                }
              )}

            </div>

          )}

        </section>

      </main>

    </div>

  );

}


export default PracticeHistory;