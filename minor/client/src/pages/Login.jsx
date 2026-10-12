import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, LogIn, KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const navigate = useNavigate();

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (email.trim().toLowerCase() === "admin@aiinterviewprep.com") {
        const response = await fetch(`${API_URL}/api/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Admin login failed");
        }

        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.admin));
        localStorage.setItem("user", JSON.stringify({ ...data.admin, role: "admin" }));
        localStorage.setItem("token", data.token);
        window.location.href = "/admin";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (data.user?.role === "admin") {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        window.location.href = "/admin";
        return;
      }

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");
    setForgotLoading(true);

    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setForgotSuccess("Password reset successfully! Returning to login...");

      setTimeout(() => {
        setShowForgot(false);
        setEmail(forgotEmail);
        setPassword("");
        setForgotError("");
        setForgotSuccess("");
      }, 2200);
    } catch (err) {
      setForgotError(err.message || "Unable to reset password");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          <Brain size={30} />
          <span>AI Interview Prep</span>
        </div>

        {showForgot ? (
          /* =========================================================
             FORGOT PASSWORD FORM
             ========================================================= */
          <div>
            <div className="login-heading">
              <div className="login-icon">
                <KeyRound size={25} />
              </div>
              <h1>Reset Password</h1>
              <p>Enter your registered email and choose a new password.</p>
            </div>

            {forgotError && (
              <div className="login-error">
                {forgotError}
              </div>
            )}

            {forgotSuccess && (
              <div
                style={{
                  marginTop: "18px",
                  padding: "12px 16px",
                  background: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid rgba(16, 185, 129, 0.5)",
                  borderRadius: "10px",
                  color: "#6ee7b7",
                  fontSize: "14px",
                  fontWeight: 600,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <CheckCircle2 size={18} />
                {forgotSuccess}
              </div>
            )}

            <form onSubmit={handleResetPassword}>
              <div className="login-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password (min. 6 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>

              <div className="login-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                className="login-submit"
                disabled={forgotLoading}
              >
                {forgotLoading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>

            <div className="login-footer" style={{ marginTop: "20px" }}>
              <button
                type="button"
                onClick={() => {
                  setShowForgot(false);
                  setForgotError("");
                  setForgotSuccess("");
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#38bdf8",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ArrowLeft size={16} /> Back to Login
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================
             STANDARD LOGIN FORM
             ========================================================= */
          <div>
            <div className="login-heading">
              <div className="login-icon">
                <LogIn size={25} />
              </div>
              <h1>Welcome Back</h1>
              <p>Login to continue your interview preparation.</p>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="login-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="forgot-password">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(true);
                    setForgotEmail(email);
                    setForgotError("");
                    setForgotSuccess("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "#38bdf8",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#7dd3fc")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#38bdf8")}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Don't have an account?
                <Link to="/signup">
                  Create Account
                </Link>
              </p>

              <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <Link
                  to="/admin/login"
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "color 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                >
                  🔒 Admin Portal
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Login;