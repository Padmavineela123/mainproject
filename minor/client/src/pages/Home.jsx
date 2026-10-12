import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Code2,
  MessageSquare,
  Target,
} from "lucide-react";
import hero3dImg from "../assets/hero-3d.jpg";
import "./Home.css";

function Home() {
  return (
    <div className="home-page dark-theme">

      {/* =========================
          NAVIGATION
      ========================= */}
      <header className="navbar-wrapper">
        <nav className="navbar">
          <div className="logo">
            <div className="logo-icon-box">
              <Brain size={26} />
            </div>
            <span>AI Interview Prep</span>
          </div>

          <div className="nav-links">
            <a href="#home" className="active-nav">Home</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </div>

          <div className="nav-buttons">
            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero" id="home">
        <div className="hero-container">

          {/* Hero Content Left */}
          <div className="hero-content">
            <h1>
              AI Based Interactive
              <br />
              <span className="hero-gradient-text">Interview Preparation</span>
              <br />
              System
            </h1>

            <p>
              An interactive platform that helps students prepare for
              Aptitude, Technical, Coding and HR interviews with
              intelligent feedback and performance tracking.
            </p>

            <div className="hero-buttons">
              <Link to="/signup" className="primary-btn">
                Start Preparation
                <ArrowRight size={18} />
              </Link>

              <a href="#features" className="secondary-btn">
                Explore Modules
              </a>
            </div>
          </div>

          {/* Hero Image Right */}
          <div className="hero-image-wrapper">
            <div className="hero-glow-aura"></div>
            <img
              src={hero3dImg}
              alt="AI Interview Preparation 3D Workspace"
              className="hero-3d-img"
            />
          </div>

        </div>
      </section>

      {/* =========================
          FEATURES SECTION
      ========================= */}
      <section className="features" id="features">
        <div className="features-container">

          <div className="section-heading">
            <span className="section-pill">PREPARATION MODULES</span>
            <h2>Everything you need for your interview</h2>
            <p>Practice different interview skills in one platform.</p>
          </div>

          <div className="feature-grid">
            <Feature
              icon={<Target size={26} />}
              title="Aptitude"
              text="Practice Basic, Advanced and Verbal rounds with time limits."
              iconColorClass="icon-glow-cyan"
            />

            <Feature
              icon={<Code2 size={26} />}
              title="Technical"
              text="Prepare C, Java, Python and Data Structures questions."
              iconColorClass="icon-glow-blue"
            />

            <Feature
              icon={<Code2 size={26} />}
              title="Coding"
              text="Solve programming problems with time-based coding practice."
              iconColorClass="icon-glow-purple"
            />

            <Feature
              icon={<MessageSquare size={26} />}
              title="HR Interview"
              text="Answer HR questions and receive AI-powered feedback."
              iconColorClass="icon-glow-pink"
            />
          </div>

        </div>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================= */}
      <section className="how-it-works" id="about">
        <div className="how-container">

          <div className="section-heading">
            <span className="section-pill">HOW IT WORKS</span>
            <h2>Prepare → Practice → Improve</h2>
            <p>Follow a simple process to improve your interview skills.</p>
          </div>

          <div className="steps-container">
            <div className="steps-line"></div>

            <div className="steps">
              <div className="step">
                <div className="step-number-container">
                  <div className="step-number">01</div>
                </div>
                <h3>Choose Module</h3>
                <p>Select Aptitude, Technical, Coding or HR.</p>
              </div>

              <div className="step">
                <div className="step-number-container">
                  <div className="step-number">02</div>
                </div>
                <h3>Take Test</h3>
                <p>Answer questions within the given time.</p>
              </div>

              <div className="step">
                <div className="step-number-container">
                  <div className="step-number">03</div>
                </div>
                <h3>Get Feedback</h3>
                <p>View your score and AI-powered feedback.</p>
              </div>

              <div className="step">
                <div className="step-number-container">
                  <div className="step-number">04</div>
                </div>
                <h3>Track Progress</h3>
                <p>Identify weak areas and improve continuously.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <Brain size={22} />
            <span>AI Interview Prep</span>
          </div>
          <p>© 2026 AI-Based Interactive Interview Preparation System</p>
        </div>
      </footer>

    </div>
  );
}

/* =========================
   FEATURE COMPONENT
========================= */

function Feature({ icon, title, text, iconColorClass = "icon-glow-blue" }) {
  return (
    <div className="feature-card">
      <div className={`feature-icon ${iconColorClass}`}>
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <button type="button" className="feature-button">
        <span>Explore</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

export default Home;
