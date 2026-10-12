import { useEffect, useState } from "react";
import {
  Mail,
  Trophy,
  Target,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Edit3,
  BarChart3,
  Award,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [testHistory, setTestHistory] = useState([]);
  const [editing, setEditing] = useState(false);

  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const loadProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const [userResponse, historyResponse] = await Promise.all([
        fetch(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`${API_URL}/api/tests/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (!userResponse.ok || !historyResponse.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      const userData = await userResponse.json();
      const historyData = await historyResponse.json();

      const currentUser = userData.user || {};

      const normalizedUser = {
        id: currentUser.id || currentUser._id || "",
        username:
          currentUser.name ||
          currentUser.username ||
          "",
        email: currentUser.email || "",
        role: currentUser.role || "user",
      };

      setUser(normalizedUser);
      setEditUsername(normalizedUser.username);
      setEditEmail(normalizedUser.email);

      const results = Array.isArray(historyData.results)
        ? historyData.results
        : [];

      setTestHistory(
        results.map((test) => ({
          ...test,
          date: test.createdAt
            ? new Date(test.createdAt).toLocaleDateString()
            : "—",
        }))
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: normalizedUser.id,
          name: normalizedUser.username,
          email: normalizedUser.email,
          role: normalizedUser.role,
        })
      );
    } catch (error) {
      console.error("Unable to load profile:", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const saveProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const name = editUsername.trim();
    const email = editEmail.trim();

    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update profile");
      }

      const updatedUser = {
        id: data.user.id || data.user._id || user.id,
        username: data.user.name || name,
        email: data.user.email || email,
        role: data.user.role || user.role || "user",
      };

      setUser(updatedUser);
      setEditUsername(updatedUser.username);
      setEditEmail(updatedUser.email);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: updatedUser.id,
          name: updatedUser.username,
          email: updatedUser.email,
          role: updatedUser.role,
        })
      );
      setEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      alert(error.message);
    }
  };

  // -----------------------------
  // PERFORMANCE CALCULATIONS
  // -----------------------------

  const totalTests = testHistory.length;

  const totalCorrect = testHistory.reduce(
    (sum, test) => sum + Number(test.correct || 0),
    0
  );

  const totalIncorrect = testHistory.reduce(
    (sum, test) => sum + Number(test.incorrect || 0),
    0
  );

  const totalQuestions = testHistory.reduce(
    (sum, test) =>
      sum +
      Number(
        test.totalQuestions ||
          Number(test.correct || 0) + Number(test.incorrect || 0)
      ),
    0
  );

  const averageScore =
    totalTests > 0
      ? Math.round(
          testHistory.reduce(
            (sum, test) =>
              sum +
              Number(
                test.percentage ||
                  test.score ||
                  0
              ),
            0
          ) / totalTests
        )
      : 0;

  const bestScore =
    totalTests > 0
      ? Math.max(
          ...testHistory.map((test) =>
            Number(test.percentage || test.score || 0)
          )
        )
      : 0;

  const accuracy =
    totalQuestions > 0
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0;

  return (
    <div className="profile-page">

      {/* HEADER */}

      <header className="profile-header">

        <div className="profile-brand">
          <div className="profile-brand-icon">
            <BarChart3 size={24} />
          </div>

          <span>AI Interview Prep</span>
        </div>

        <Link to="/dashboard" className="back-dashboard">
          <ArrowLeft size={18} />
          Dashboard
        </Link>

      </header>


      {/* MAIN CONTENT */}

      <main className="profile-container">

        {/* PAGE TITLE */}

        <div className="profile-title-section">
          <div>
            <h1>My Profile</h1>
            <p>
              View your account information and interview preparation
              performance.
            </p>
          </div>
        </div>


        {/* PROFILE CARD */}

        <section className="profile-main-card">

          <div className="profile-avatar">
            {user.username
              ? user.username.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div className="profile-information">

            {!editing ? (
              <>
                <h2>
                  {user.username || "User"}
                </h2>

                <div className="profile-email">
                  <Mail size={18} />
                  <span>
                    {user.email || "No email available"}
                  </span>
                </div>
              </>
            ) : (
              <div className="edit-profile-form">

                <div className="edit-field">
                  <label>User Name</label>

                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) =>
                      setEditUsername(e.target.value)
                    }
                    placeholder="Enter username"
                  />
                </div>

                <div className="edit-field">
                  <label>Email ID</label>

                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) =>
                      setEditEmail(e.target.value)
                    }
                    placeholder="Enter email"
                  />
                </div>

              </div>
            )}

          </div>


          {!editing ? (
            <button
              className="edit-profile-button"
              onClick={() => setEditing(true)}
            >
              <Edit3 size={17} />
              Edit Profile
            </button>
          ) : (
            <div className="edit-buttons">

              <button
                className="cancel-button"
                onClick={() => {
                  setEditUsername(user.username);
                  setEditEmail(user.email);
                  setEditing(false);
                }}
              >
                Cancel
              </button>

              <button
                className="save-button"
                onClick={saveProfile}
              >
                Save
              </button>

            </div>
          )}

        </section>


        {/* STATISTICS */}

        <section className="statistics-section">

          <div className="stat-card">

            <div className="stat-icon blue">
              <FileText size={22} />
            </div>

            <div>
              <span>Total Tests</span>
              <strong>{totalTests}</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              <Target size={22} />
            </div>

            <div>
              <span>Average Score</span>
              <strong>{averageScore}%</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              <Trophy size={22} />
            </div>

            <div>
              <span>Best Score</span>
              <strong>{bestScore}%</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon purple">
              <Award size={22} />
            </div>

            <div>
              <span>Accuracy</span>
              <strong>{accuracy}%</strong>
            </div>

          </div>

        </section>


        {/* PERFORMANCE SUMMARY */}

        <section className="performance-summary">

          <div className="section-heading">
            <div>
              <h2>Performance Summary</h2>
              <p>
                Your overall interview preparation statistics
              </p>
            </div>
          </div>


          <div className="performance-grid">

            <div className="performance-box correct-box">

              <CheckCircle size={28} />

              <div>
                <span>Correct Answers</span>
                <strong>{totalCorrect}</strong>
              </div>

            </div>


            <div className="performance-box incorrect-box">

              <XCircle size={28} />

              <div>
                <span>Incorrect Answers</span>
                <strong>{totalIncorrect}</strong>
              </div>

            </div>


            <div className="performance-box question-box">

              <FileText size={28} />

              <div>
                <span>Total Questions</span>
                <strong>{totalQuestions}</strong>
              </div>

            </div>


            <div className="performance-box time-box">

              <Clock size={28} />

              <div>
                <span>Tests Attempted</span>
                <strong>{totalTests}</strong>
              </div>

            </div>

          </div>

        </section>


        {/* TEST HISTORY */}

        <section className="history-section">

          <div className="section-heading">

            <div>
              <h2>Test Performance</h2>
              <p>
                Your recently completed interview preparation tests
              </p>
            </div>

          </div>


          {testHistory.length === 0 ? (

            <div className="no-tests">

              <div className="no-tests-icon">
                <BarChart3 size={30} />
              </div>

              <h3>No tests completed yet</h3>

              <p>
                Complete your first aptitude or technical test
                to see your performance here.
              </p>

              <Link
                to="/aptitude"
                className="start-test-button"
              >
                Start a Test
              </Link>

            </div>

          ) : (

            <div className="test-table-wrapper">

              <table className="test-table">

                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Score</th>
                    <th>Correct</th>
                    <th>Incorrect</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {testHistory
                    .slice()
                    .reverse()
                    .map((test, index) => {

                      const score = Number(
                        test.percentage ||
                        test.score ||
                        0
                      );

                      return (
                        <tr key={index}>

                          <td>
                            <div className="test-name">
                              <div className="test-icon">
                                <FileText size={17} />
                              </div>

                              <span>
                                {test.testName ||
                                  test.name ||
                                  "Interview Test"}
                              </span>
                            </div>
                          </td>

                          <td>
                            <strong className="score-text">
                              {score}%
                            </strong>
                          </td>

                          <td>
                            <span className="correct-text">
                              {test.correct || 0}
                            </span>
                          </td>

                          <td>
                            <span className="incorrect-text">
                              {test.incorrect || 0}
                            </span>
                          </td>

                          <td>
                            {test.date || "—"}
                          </td>

                          <td>

                            <span
                              className={
                                score >= 70
                                  ? "status-badge good"
                                  : score >= 40
                                  ? "status-badge average"
                                  : "status-badge needs"
                              }
                            >
                              {score >= 70
                                ? "Good"
                                : score >= 40
                                ? "Average"
                                : "Needs Practice"}
                            </span>

                          </td>

                        </tr>
                      );
                    })}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Profile;