import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle2,
  Clock3,
  LogOut,
  RefreshCw,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ROUND_NAMES = [
  { key: "aptitude", label: "Aptitude" },
  { key: "verbal", label: "Verbal" },
  { key: "technical", label: "Technical" },
  { key: "coding", label: "Coding" },
  { key: "hr", label: "HR Interview" },
];

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString();
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD ADMIN DASHBOARD DATA
  // =========================================================
  const loadDashboard = async (isRefresh = false) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await fetch(`${API_URL}/api/admin/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      let result = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      // -------------------------------------------------------
      // ADMIN TOKEN EXPIRED / INVALID
      // -------------------------------------------------------
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        navigate("/admin/login");
        return;
      }

      // -------------------------------------------------------
      // OTHER API ERROR
      // -------------------------------------------------------
      if (!response.ok) {
        throw new Error(
          result.message || "Unable to load dashboard data"
        );
      }

      // -------------------------------------------------------
      // SAVE LATEST DATABASE DATA
      // -------------------------------------------------------
      setData(result);
    } catch (err) {
      console.error("Admin dashboard error:", err);

      setError(
        err.message ||
          "Unable to connect to the server. Make sure your backend is running."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================
  useEffect(() => {
    loadDashboard(false);
  }, []);

  // =========================================================
  // REFRESH BUTTON
  // =========================================================
  const handleRefresh = () => {
    if (refreshing) return;

    loadDashboard(true);
  };

  // =========================================================
  // PERFORMANCE DATA
  // =========================================================
  const performanceMap = useMemo(() => {
    const map = {};

    (data?.performanceByRound || []).forEach((item) => {
      map[item.key] = item;
    });

    return map;
  }, [data]);

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate("/admin/login");
  };

  // =========================================================
  // INITIAL LOADING SCREEN
  // =========================================================
  if (loading && !data) {
    return (
      <div className="admin-loading">
        <Brain size={30} />
        <span>Loading admin dashboard...</span>
      </div>
    );
  }

  // =========================================================
  // DASHBOARD
  // =========================================================
  return (
    <div className="admin-dashboard">
      {/* =====================================================
          TOP BAR
      ====================================================== */}
      <header className="admin-topbar">
        {/* BRAND */}
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <Brain size={27} />
          </div>

          <div>
            <strong>AI Interview Prep</strong>
            <span>Admin Panel</span>
          </div>
        </div>

        {/* TOP ACTIONS */}
        <div className="admin-top-actions">
          {/* REFRESH */}
          <button
            className={`admin-refresh ${
              refreshing ? "refreshing" : ""
            }`}
            onClick={handleRefresh}
            disabled={refreshing}
            title="Refresh dashboard data"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "refresh-icon-spin" : ""}
            />

            <span>
              {refreshing ? "Refreshing..." : "Refresh"}
            </span>
          </button>

          {/* ADMIN ACCOUNT */}
          <div className="admin-account">
            <div className="admin-avatar">A</div>

            <div>
              <strong>Administrator</strong>
              <span>Admin</span>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            className="admin-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="admin-main">
        {/* PAGE TITLE */}
        <section className="admin-title-row">
          <div>
            <p className="admin-eyebrow">SYSTEM OVERVIEW</p>

            <h1>Admin Dashboard</h1>

            <p>
              Monitor website usage and student performance
              without changing the normal student experience.
            </p>
          </div>

          <div className="admin-live">
            <Activity size={17} />
            Live database data
          </div>
        </section>

        {/* ERROR */}
        {error && (
          <div className="admin-error">
            <strong>Dashboard error:</strong>
            <span>{error}</span>
          </div>
        )}

        {/* ===================================================
            STAT CARDS
        ==================================================== */}
        <section className="admin-stat-grid">
          <StatCard
            icon={<Users size={23} />}
            label="Total Users"
            value={data?.stats?.totalUsers ?? 0}
            note="Registered student accounts"
          />

          <StatCard
            icon={<Activity size={23} />}
            label="Active Users"
            value={data?.stats?.activeUsers ?? 0}
            note="Logged in within 30 days"
          />

          <StatCard
            icon={<Target size={23} />}
            label="Test Attempts"
            value={data?.stats?.totalAttempts ?? 0}
            note="Completed tests recorded"
          />

          <StatCard
            icon={<TrendingUp size={23} />}
            label="Average Score"
            value={`${data?.stats?.averageScore ?? 0}%`}
            note="Across recorded tests"
          />
        </section>

        {/* ===================================================
            PERFORMANCE + USAGE
        ==================================================== */}
        <section className="admin-content-grid">
          {/* PERFORMANCE */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h2>Performance by Test</h2>

                <p>
                  Average score and number of recorded attempts.
                </p>
              </div>

              <BarChart3 size={22} />
            </div>

            <div className="round-performance">
              {ROUND_NAMES.map((round) => {
                const item = performanceMap[round.key];

                const score = Math.round(
                  item?.averageScore || 0
                );

                const attempts = item?.attempts || 0;

                return (
                  <div
                    className="round-row"
                    key={round.key}
                  >
                    <div className="round-label">
                      <span>{round.label}</span>

                      <strong>{score}%</strong>
                    </div>

                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${Math.min(score, 100)}%`,
                        }}
                      />
                    </div>

                    <small>
                      {attempts}{" "}
                      {attempts === 1
                        ? "attempt"
                        : "attempts"}
                    </small>
                  </div>
                );
              })}
            </div>
          </div>

          {/* USAGE SUMMARY */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h2>Usage Summary</h2>

                <p>
                  Current activity across the platform.
                </p>
              </div>

              <Trophy size={22} />
            </div>

            <div className="usage-list">
              <div>
                <span>New users, last 7 days</span>

                <strong>
                  {data?.stats?.newUsersLast7Days ?? 0}
                </strong>
              </div>

              <div>
                <span>Attempts, last 7 days</span>

                <strong>
                  {data?.stats?.attemptsLast7Days ?? 0}
                </strong>
              </div>

              <div>
                <span>Highest recorded score</span>

                <strong>
                  {data?.stats?.highestScore ?? 0}%
                </strong>
              </div>

              <div>
                <span>Average completion</span>

                <strong>
                  {data?.stats?.averageCompletion ?? 0}%
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            RECENT ACTIVITY + NEW USERS
        ==================================================== */}
        <section className="admin-content-grid lower">
          {/* RECENT TEST ACTIVITY */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h2>Recent Test Activity</h2>

                <p>
                  The latest completed tests stored in the
                  database.
                </p>
              </div>

              <Clock3 size={22} />
            </div>

            {data?.recentActivity?.length ? (
              <div className="activity-table-wrap">
                <table className="activity-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Test</th>
                      <th>Score</th>
                      <th>Questions</th>
                      <th>Completed</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.recentActivity.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="student-cell">
                            <div className="mini-avatar">
                              {(
                                item.user?.name || "S"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {item.user?.name ||
                                  "Student"}
                              </strong>

                              <span>
                                {item.user?.email || "—"}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <strong>
                            {item.testName}
                          </strong>

                          <span className="table-subtext">
                            {item.category}
                          </span>
                        </td>

                        <td>
                          <span className="score-badge">
                            {item.percentage}%
                          </span>
                        </td>

                        <td>
                          {item.totalQuestions}
                        </td>

                        <td>
                          {formatDate(item.completedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="admin-empty">
                <CheckCircle2 size={28} />

                <p>
                  No test results have been recorded yet.
                </p>
              </div>
            )}
          </div>

          {/* NEW USERS */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h2>New Users</h2>

                <p>
                  Most recently registered students.
                </p>
              </div>

              <Users size={22} />
            </div>

            <div className="new-users-list">
              {(data?.recentUsers || []).map((user) => (
                <div
                  className="new-user"
                  key={user.id}
                >
                  <div className="mini-avatar">
                    {(user.name || "S")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>{user.name}</strong>

                    <span>{user.email}</span>
                  </div>

                  <small>
                    {formatDate(user.createdAt)}
                  </small>
                </div>
              ))}

              {!data?.recentUsers?.length && (
                <div className="admin-empty">
                  <p>No users yet.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <p className="admin-footer">
          Admin view is separate from the student dashboard.
          Student pages and routes remain unchanged.
        </p>
      </main>
    </div>
  );
}

// ===========================================================
// STAT CARD
// ===========================================================
function StatCard({ icon, label, value, note }) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>

        <strong>{value}</strong>

        <small>{note}</small>
      </div>
    </div>
  );
}