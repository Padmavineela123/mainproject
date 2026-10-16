import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Brain,
  Menu,
  X,
  Bell,
  ChevronDown,
  Home,
  Target,
  Code2,
  Laptop,
  MessageSquare,
  BarChart3,
  History,
  User,
  Settings,
  LogOut,
  FileText,
  Clock3,
  TrendingUp,
  Trophy,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import "./Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  /* ── Dynamic notifications based on practice data ── */
  const getNotifications = () => {
    const notes = [];
    const basicCorrect = Number(localStorage.getItem("aptitudeBasicsCorrect") || 0);
    const advCorrect = Number(localStorage.getItem("aptitudeAdvancedCorrect") || 0);

    if (basicCorrect > 0 || advCorrect > 0) {
      notes.push({
        id: 1,
        text: `You scored ${basicCorrect + advCorrect} correct answers across aptitude rounds. Keep practicing!`,
        time: "Recent",
      });
    }

    notes.push({
      id: 2,
      text: "Try the Verbal Aptitude round to improve your language skills.",
      time: "Suggestion",
    });

    notes.push({
      id: 3,
      text: "Complete all rounds to unlock your full performance report.",
      time: "Tip",
    });

    return notes;
  };

  const notifications = getNotifications();

  // =====================================
  // VERIFY LOGIN WITH BACKEND
  // =====================================
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        setUser(data.user);

        // Keep user information updated
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

      } catch (error) {
        console.error(
          "Authentication check failed:",
          error
        );

        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [navigate]);

  // =====================================
  // LOGOUT
  // =====================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =====================================
  // LOADING
  // =====================================
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* =========================
          TOP NAVBAR
      ========================= */}
      <header className="top-navbar">

        <div className="brand-section">
          <div className="brand-icon">
            <Brain size={32} />
          </div>

          <h2>AI Interview Prep</h2>

          <button
            type="button"
            className="menu-button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <Menu size={25} />
          </button>
        </div>

        <div className="navbar-right">

          <div className="notification" style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => {
                setNotificationOpen((prev) => !prev);
                setProfileMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "inherit",
                position: "relative",
                padding: "4px",
              }}
              aria-label="Notifications"
            >
              <Bell size={24} />
              {notifications.length > 0 && (
                <span>{notifications.length}</span>
              )}
            </button>

            {notificationOpen && (
              <div
                className="notification-dropdown"
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  width: "320px",
                  background: "var(--card-bg, #1a1a2e)",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  zIndex: 999,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    fontWeight: 600,
                    fontSize: "15px",
                  }}
                >
                  Notifications
                </div>

                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      fontSize: "13px",
                      lineHeight: "1.5",
                    }}
                  >
                    <div>{n.text}</div>
                    <div
                      style={{
                        fontSize: "11px",
                        opacity: 0.5,
                        marginTop: "4px",
                      }}
                    >
                      {n.time}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="student-profile-wrapper">

            <button
              type="button"
              className="student-profile"
              onClick={() =>
                setProfileMenuOpen((previous) => !previous)
              }
              aria-expanded={profileMenuOpen}
              aria-label="Open student menu"
            >
              <div className="profile-circle">
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : "S"}
              </div>

              <div className="profile-text">
                <strong>
                  {user?.name || "Student"}
                </strong>

                <small>Welcome!</small>
              </div>

              <ChevronDown
                size={18}
                className={
                  profileMenuOpen
                    ? "profile-chevron open"
                    : "profile-chevron"
                }
              />
            </button>

            {profileMenuOpen && (
              <div className="profile-dropdown">

                <div className="profile-dropdown-user">
                  <strong>{user?.name || "Student"}</strong>
                  <span>{user?.email || ""}</span>
                </div>

                <Link
                  to="/profile"
                  className="profile-dropdown-item"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  <User size={17} />
                  Profile
                </Link>

                <Link
                  to="/settings"
                  className="profile-dropdown-item"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  <Settings size={17} />
                  Settings
                </Link>

                <button
                  type="button"
                  className="profile-dropdown-item logout-dropdown-item"
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


      {/* =========================
          MOBILE OVERLAY
      ========================= */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

        {/* Mobile Header */}
        <div className="mobile-sidebar-header">
          <div className="mobile-sidebar-brand">
            <Brain size={26} />
            <span>AI Interview Prep</span>
          </div>
          <button
            type="button"
            className="mobile-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="sidebar-menu">

          <Link
            to="/dashboard"
            className="sidebar-item active"
            onClick={() => setSidebarOpen(false)}
          >
            <Home size={22} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/aptitude"
            className="sidebar-item"
            onClick={() => setSidebarOpen(false)}
          >
            <Target size={22} />
            <span>Aptitude</span>
          </Link>

          <Link
            to="/technical"
            className="sidebar-item"
            onClick={() => setSidebarOpen(false)}
          >
            <Code2 size={22} />
            <span>Technical</span>
          </Link>

          <Link
            to="/coding"
            className="sidebar-item"
            onClick={() => setSidebarOpen(false)}
          >
            <Laptop size={22} />
            <span>Coding</span>
          </Link>

          <Link
            to="/hr-interview"
            className="sidebar-item"
            onClick={() => setSidebarOpen(false)}
          >
            <MessageSquare size={22} />
            <span>HR Interview</span>
          </Link>

          <Link
            to="/results"
            className="sidebar-item"
            onClick={() => setSidebarOpen(false)}
          >
            <BarChart3 size={22} />
            <span>Results</span>
          </Link>

          <Link
            to="/practice-history"
            className="sidebar-item"
            onClick={() => setSidebarOpen(false)}
          >
            <History size={22} />
            <span>Practice History</span>
          </Link>

          <Link
            to="/profile"
            className="sidebar-item"
            onClick={() => setSidebarOpen(false)}
          >
            <User size={22} />
            <span>Profile</span>
          </Link>

          <Link
            to="/settings"
            className="sidebar-item"
            onClick={() => setSidebarOpen(false)}
          >
            <Settings size={22} />
            <span>Settings</span>
          </Link>

          <button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            className="sidebar-item logout"
            style={{
              border: "none",
              background: "none",
              width: "100%",
              cursor: "pointer",
              font: "inherit",
              textAlign: "left",
            }}
          >
            <LogOut size={22} />
            <span>Logout</span>
          </button>

        </nav>


        {/* Sidebar Bottom Card */}
        <div className="journey-card">

          <div className="journey-icon">
            <Trophy size={34} />
          </div>

          <p>
            Start your journey and
            <br />
            become interview ready!
          </p>

          <Link
            to="/aptitude"
            className="journey-button"
          >
            Start Now
            <ArrowRight size={18} />
          </Link>

        </div>

      </aside>


      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main className="main-content">

        {/* =========================
            WELCOME SECTION
        ========================= */}
        <section className="welcome-section">

          <div className="welcome-content">

            <h1>
              Welcome to AI Interview Prep! 👋
            </h1>

            <p>
              Choose a module below to start your practice.
            </p>

          </div>

          <div className="welcome-illustration">

            <div className="illustration-chart">
              <BarChart3 size={60} />
            </div>

            <div className="person">
              <div className="person-head"></div>
              <div className="person-body"></div>
            </div>

            <div className="plant">
              🌱
            </div>

          </div>

        </section>


        {/* =========================
            MODULE CARDS
        ========================= */}
        <section className="module-grid">

          <div className="module-card aptitude-card">

            <div className="module-icon">
              <Target size={50} />
            </div>

            <h2>Aptitude</h2>

            <p>
              Practice aptitude questions
              <br />
              for placement tests.
            </p>

            <Link
              to="/aptitude"
              className="module-button"
            >
              Start Test
              <ArrowRight size={18} />
            </Link>

          </div>


          <div className="module-card technical-card">

            <div className="module-icon">
              <Code2 size={50} />
            </div>

            <h2>Technical</h2>

            <p>
              Prepare technical MCQs
              <br />
              and concept questions.
            </p>

            <Link
              to="/technical"
              className="module-button"
            >
              Start Test
              <ArrowRight size={18} />
            </Link>

          </div>


          <div className="module-card coding-card">

            <div className="module-icon">
              <Laptop size={50} />
            </div>

            <h2>Coding</h2>

            <p>
              Solve coding problems
              <br />
              and improve skills.
            </p>

            <Link
              to="/coding"
              className="module-button"
            >
              Start Coding
              <ArrowRight size={18} />
            </Link>

          </div>


          <div className="module-card hr-card">

            <div className="module-icon">
              <MessageSquare size={50} />
            </div>

            <h2>HR Interview</h2>

            <p>
              Practice HR questions and
              <br />
              improve communication.
            </p>

            <Link
              to="/hr-interview"
              className="module-button"
            >
              Start Mock
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>


        {/* =========================
            LOWER SECTION
        ========================= */}
        <section className="bottom-grid">

          <div className="info-card">

            <h2>How It Works</h2>

            <div className="heading-line"></div>

            <div className="steps">

              <div className="step">

                <div className="step-icon purple">
                  <FileText size={28} />
                </div>

                <h3>1. Choose Module</h3>

                <p>
                  Select the area you
                  <br />
                  want to practice.
                </p>

              </div>

              <div className="step-arrow">
                →
              </div>

              <div className="step">

                <div className="step-icon blue">
                  <Clock3 size={28} />
                </div>

                <h3>2. Take Test</h3>

                <p>
                  Answer questions
                  <br />
                  within the time limit.
                </p>

              </div>

              <div className="step-arrow">
                →
              </div>

              <div className="step">

                <div className="step-icon green">
                  <TrendingUp size={28} />
                </div>

                <h3>3. Get Feedback</h3>

                <p>
                  Receive AI-powered
                  <br />
                  feedback instantly.
                </p>

              </div>

              <div className="step-arrow">
                →
              </div>

              <div className="step">

                <div className="step-icon orange">
                  <Trophy size={28} />
                </div>

                <h3>4. Improve</h3>

                <p>
                  Track progress and
                  <br />
                  improve your skills.
                </p>

              </div>

            </div>

          </div>


          <div className="info-card why-card">

            <div>

              <h2>Why Choose Us?</h2>

              <div className="heading-line"></div>

              <ul className="benefits">

                <li>
                  <CheckCircle2 />
                  <span>AI-Powered evaluations</span>
                </li>

                <li>
                  <CheckCircle2 />
                  <span>Real-time feedback</span>
                </li>

                <li>
                  <CheckCircle2 />
                  <span>Mock interviews</span>
                </li>

                <li>
                  <CheckCircle2 />
                  <span>Detailed performance analysis</span>
                </li>

                <li>
                  <CheckCircle2 />
                  <span>Improve confidence</span>
                </li>

              </ul>

            </div>

            <div className="robot">
              <div className="robot-face">
                🤖
              </div>
            </div>

          </div>

        </section>


        {/* =========================
            FOOTER
        ========================= */}
        <footer>
          © 2026 AI Interview Prep. All rights reserved.
        </footer>

      </main>

    </div>
  );
}

export default Dashboard;