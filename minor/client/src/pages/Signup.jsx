import { useState } from "react";
import { Brain, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    // Check password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password length
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Signup failed"
        );
      }

      // Signup successful
      alert("Account created successfully!");

      // Go to Login page
      navigate("/login");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <Brain size={30} />
          <span>AI Interview Prep</span>
        </div>

        <div className="auth-heading">

          <div className="auth-icon">
            <UserPlus size={25} />
          </div>

          <h1>Create Account</h1>

          <p>
            Start your interview preparation journey today.
          </p>

        </div>

        <form onSubmit={handleSignup}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p
              style={{
                color: "#fca5a5",
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid rgba(239, 68, 68, 0.45)",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="auth-footer">

          <p>
            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;