import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, LogIn } from "lucide-react";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
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

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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

        {/* Heading */}
        <div className="login-heading">

          <div className="login-icon">
            <LogIn size={25} />
          </div>

          <h1>Welcome Back</h1>

          <p>
            Login to continue your interview preparation.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>

          <div className="login-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="login-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <div className="forgot-password">
            <span
              style={{
                color: "#64748b",
                fontSize: "13px",
                cursor: "default",
              }}
              title="Password reset is not enabled in this demo build."
            >
              Password reset unavailable.
            </span>
          </div>

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Signup */}
        <div className="login-footer">

          <p>
            Don't have an account?

            <Link to="/signup">
              Create Account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;