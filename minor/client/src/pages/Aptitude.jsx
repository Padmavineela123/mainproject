import { useState } from "react";
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
  Trophy,
  ArrowRight,
  Calculator,
  CheckCircle2,
} from "lucide-react";

import "./Aptitude.css";

function Aptitude() {
  const navigate = useNavigate();
  const [user] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  });
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  return (
    <div className="aptitude-page">

      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}
      <header className="apt-topbar">

        <div className="apt-brand">

          <div className="apt-brand-icon">
            <Brain size={31} />
          </div>

          <h2>AI Interview Prep</h2>

          <button
            className="apt-menu"
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <Menu size={25} />
          </button>

        </div>


        <div className="apt-top-right">

          {/* Notification */}
          <div className="apt-notification">

            <Bell size={23} />

            <span>3</span>

          </div>


          {/* Profile */}
          <div className="apt-profile-wrapper">

            <button
              type="button"
              className="apt-profile"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
              aria-expanded={profileMenuOpen}
              aria-label="Open profile menu"
            >
              <div className="apt-profile-circle">
                {(user?.name || user?.email || "Student").charAt(0).toUpperCase()}
              </div>

              <div className="apt-profile-info">
                <strong>{user?.name || "Student"}</strong>
                <small>{user?.email || "Welcome!"}</small>
              </div>

              <ChevronDown
                size={18}
                className={profileMenuOpen ? "apt-chevron open" : "apt-chevron"}
              />
            </button>

            {profileMenuOpen && (
              <div className="apt-profile-dropdown">

                <div className="apt-dropdown-user">
                  <strong>{user?.name || "Student"}</strong>
                  <span>{user?.email || ""}</span>
                </div>

                <Link
                  to="/profile"
                  className="apt-dropdown-item"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  <User size={17} />
                  Profile
                </Link>

                <Link
                  to="/settings"
                  className="apt-dropdown-item"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  <Settings size={17} />
                  Settings
                </Link>

                <button
                  type="button"
                  className="apt-dropdown-item apt-dropdown-logout"
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


      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}
      {sidebarOpen && (
        <div
          className="apt-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <aside className={`apt-sidebar ${sidebarOpen ? "apt-sidebar-open" : ""}`}>

        {/* Mobile Header */}
        <div className="apt-mobile-sidebar-header">
          <div className="apt-mobile-sidebar-brand">
            <Brain size={26} />
            <span>AI Interview Prep</span>
          </div>
          <button
            type="button"
            className="apt-mobile-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav>

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className="apt-side-item"
            onClick={() => setSidebarOpen(false)}
          >
            <Home size={21} />
            <span>Dashboard</span>
          </Link>


          {/* Aptitude */}
          <Link
            to="/aptitude"
            className="apt-side-item apt-active"
            onClick={() => setSidebarOpen(false)}
          >
            <Target size={21} />
            <span>Aptitude</span>
          </Link>

          {/* Technical */}
          <Link
            to="/technical"
            className="apt-side-item"
            onClick={() => setSidebarOpen(false)}
          >
            <Code2 size={21} />
            <span>Technical</span>
          </Link>


          {/* Coding */}
          <Link
            to="/coding"
            className="apt-side-item"
            onClick={() => setSidebarOpen(false)}
          >
            <Laptop size={21} />
            <span>Coding</span>
          </Link>


          {/* HR Interview */}
          <Link
            to="/hr-interview"
            className="apt-side-item"
            onClick={() => setSidebarOpen(false)}
          >
            <MessageSquare size={21} />
            <span>HR Interview</span>
          </Link>

          {/* Results */}
          <Link
            to="/results"
            className="apt-side-item"
            onClick={() => setSidebarOpen(false)}
          >
            <BarChart3 size={21} />
            <span>Results</span>
          </Link>


          {/* Practice History */}
          <Link
            to="/practice-history"
            className="apt-side-item"
            onClick={() => setSidebarOpen(false)}
          >
            <History size={21} />
            <span>Practice History</span>
          </Link>


          {/* Profile */}
          <Link
            to="/profile"
            className="apt-side-item"
            onClick={() => setSidebarOpen(false)}
          >
            <User size={21} />
            <span>Profile</span>
          </Link>


          {/* Settings */}
          <Link
            to="/settings"
            className="apt-side-item"
            onClick={() => setSidebarOpen(false)}
          >
            <Settings size={21} />
            <span>Settings</span>
          </Link>


          {/* Logout */}
          <Link
            to="/login"
            className="apt-side-item apt-logout"
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
          >
            <LogOut size={21} />
            <span>Logout</span>
          </Link>

        </nav>


        {/* =====================================================
            SIDEBAR BOTTOM
        ===================================================== */}
        <div className="apt-journey">

          <Trophy size={34} />

          <p>
            Keep practicing and
            <br />
            improve your skills!
          </p>

          <Link to="/dashboard">
            Back to Dashboard
          </Link>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="apt-main">


        {/* =====================================================
            BREADCRUMB
        ===================================================== */}
        <div className="apt-breadcrumb">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <span>/</span>

          <strong>
            Aptitude
          </strong>

        </div>


        {/* =====================================================
            PAGE HEADER
        ===================================================== */}
        <section className="apt-header">

          <div>

            <div className="apt-title-icon">
              <Target size={35} />
            </div>

            <div className="apt-heading-text">

              <h1>
                Aptitude Practice
              </h1>

              <p>
                Test your logical thinking, numerical ability,
                and problem-solving skills.
              </p>

            </div>

          </div>


          <div className="apt-header-decoration">
            <Calculator size={90} />
          </div>

        </section>


        {/* =====================================================
            STATISTICS
        ===================================================== */}
        <section className="apt-stats">

          {/* Feedback */}
          <div className="apt-stat-card">

            <div className="apt-stat-icon green">
              <CheckCircle2 size={24} />
            </div>

            <div>

              <strong>
                Instant
              </strong>

              <span>
                Feedback
              </span>

            </div>

          </div>


          {/* Rounds */}
          <div className="apt-stat-card">

            <div className="apt-stat-icon orange">
              <Trophy size={24} />
            </div>

            <div>

              <strong>
                2 Rounds
              </strong>

              <span>
                Basic + Advanced
              </span>
              <span>
                Verbal
              </span>

            </div>

          </div>

        </section>


        {/* =====================================================
            ROUND HEADING
        ===================================================== */}
        <div className="round-heading">

          <div>

            <h2>
              Choose Your Round
            </h2>

            <p>
              Select a difficulty level to begin your practice.
            </p>

          </div>

        </div>


        {/* =====================================================
            ROUND CARDS
        ===================================================== */}
        <section className="round-grid">


          {/* =================================================
              BASICS ROUND
          ================================================= */}
          <div className="round-card basic-round">

            {/* Card Top */}
            <div className="round-top">

              <div className="round-icon">
                <Target size={38} />
              </div>

              <span className="level-badge">
                Beginner
              </span>

            </div>


            {/* Title */}
            <h2>
              Basics Round
            </h2>


            {/* Description */}
            <p>
              Build a strong foundation with focused placement aptitude practice and timed problem solving.
            </p>

            {/* Start Button */}
            <Link
              to="/aptitude/basics"
              className="round-button"
            >

              <span>
                Start Basics Test
              </span>

              <ArrowRight size={19} />

            </Link>

          </div>


          {/* =================================================
              ADVANCED ROUND
          ================================================= */}
          <div className="round-card advanced-round">

            {/* Card Top */}
            <div className="round-top">

              <div className="round-icon">
                <Brain size={38} />
              </div>

              <span className="level-badge">
                Advanced
              </span>

            </div>


            {/* Title */}
            <h2>
              Advanced Round
            </h2>


            {/* Description */}
            <p>
              Challenge yourself with deeper reasoning, calculation, and placement-focused aptitude problems.
            </p>

            {/* Start Button */}
            <Link
              to="/aptitude/advanced"
              className="round-button"
            >

              <span>
                Start Advanced Test
              </span>

              <ArrowRight size={19} />

            </Link>

          </div>
          {/* =====================================
    VERBAL ROUND
===================================== */}

<div className="round-card verbal-card">

  <div className="round-top">

    <div className="round-icon">
      <MessageSquare size={30} />
    </div>

    <span className="level-badge">
      Moderate
    </span>

  </div>

  <h2>Verbal Aptitude</h2>

  <p>
    Improve your vocabulary, grammar, sentence
    formation and verbal reasoning skills with
    verbal aptitude questions.
  </p>

  <Link
    to="/aptitude/verbal"
    className="round-button verbal-button"
  >
    Start Verbal Test
    <ArrowRight size={18} />
  </Link>

</div>
        </section>


        {/* =====================================================
            FOOTER
        ===================================================== */}
        <footer className="apt-footer">

          © 2026 AI Interview Prep.
          All rights reserved.

        </footer>

      </main>

    </div>
  );
}

export default Aptitude;