import { useState } from "react";
import { Brain, ShieldCheck, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Admin login failed");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.admin));
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">
        <div className="admin-auth-brand">
          <div className="admin-auth-brand-icon">
            <Brain size={28} />
          </div>
          <div>
            <strong>AI Interview Prep</strong>
            <span>Administration</span>
          </div>
        </div>

        <div className="admin-auth-heading">
          <div className="admin-auth-icon">
            <ShieldCheck size={27} />
          </div>
          <h1>Admin Login</h1>
          <p>Sign in to view users, tests and performance.</p>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-auth-form">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter admin email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            required
          />

          <button type="submit" disabled={loading}>
            <LogIn size={18} />
            {loading ? "Signing in..." : "Admin Login"}
          </button>
        </form>

        <p className="admin-auth-note">
          This is a separate administrator area. Student login remains unchanged.
        </p>
      </div>
    </div>
  );
}
