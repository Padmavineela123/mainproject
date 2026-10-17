import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Aptitude from "./pages/Aptitude";
import AptitudeBasics from "./pages/AptitudeBasics";
import AdvancedAptitude from "./pages/AdvancedAptitude";
import VerbalAptitude from "./pages/VerbalAptitude";

import Technical from "./pages/Technical";
import Coding from "./pages/Coding";
import HR from "./pages/HR";
import Result from "./pages/Result";
import PracticeHistory from "./pages/PracticeHistory";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import TestResult from "./pages/TestResult";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

/* =========================================================
   GUARDS
   ========================================================= */

function RequireAuth({ children }) {
  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("token")
      : null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
  } catch {
    // ignore parse error
  }

  return children;
}

function RequireAdmin({ children }) {
  const adminToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("adminToken") || localStorage.getItem("token")
      : null;

  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
    const isAdmin = user.role === "admin" || adminUser.role === "admin";

    if (!adminToken || !isAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
  } catch {
    if (!adminToken) {
      return <Navigate to="/admin/login" replace />;
    }
  }

  return children;
}

function RedirectIfAuthenticated({ children }) {
  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("token")
      : null;
  const adminToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
    if (adminToken || user.role === "admin" || adminUser.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
  } catch {
    // fallback
  }

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  // Pre-warm backend API server as soon as the application is launched
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    fetch(`${API_URL}/`, { method: "GET" }).catch(() => {});
  }, []);

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ================= AUTHENTICATION ================= */}

        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <Signup />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />




        {/* ================= ADMIN PANEL ================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />

        {/* ================= DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />


        {/* ================= APTITUDE ================= */}

        <Route
          path="/aptitude"
          element={
            <RequireAuth>
              <Aptitude />
            </RequireAuth>
          }
        />

        <Route
          path="/aptitude/basics"
          element={
            <RequireAuth>
              <AptitudeBasics />
            </RequireAuth>
          }
        />

        <Route
          path="/aptitude/advanced"
          element={
            <RequireAuth>
              <AdvancedAptitude />
            </RequireAuth>
          }
        />

        <Route
          path="/aptitude/verbal"
          element={
            <RequireAuth>
              <VerbalAptitude />
            </RequireAuth>
          }
        />

        <Route
          path="/verbal"
          element={
            <RequireAuth>
              <VerbalAptitude />
            </RequireAuth>
          }
        />


        {/* ================= TECHNICAL ================= */}

        <Route
          path="/technical"
          element={
            <RequireAuth>
              <Technical />
            </RequireAuth>
          }
        />

        <Route
          path="/technical/:section"
          element={
            <RequireAuth>
              <Technical />
            </RequireAuth>
          }
        />


        {/* ================= CODING ================= */}

        <Route
          path="/coding"
          element={
            <RequireAuth>
              <Coding />
            </RequireAuth>
          }
        />


        {/* ================= HR INTERVIEW ================= */}

        <Route
          path="/hr-interview"
          element={
            <RequireAuth>
              <HR />
            </RequireAuth>
          }
        />


        {/* ================= RESULT ================= */}

        <Route
  path="/results"
  element={
    <RequireAuth>
      <Result />
    </RequireAuth>
  }

/>
<Route 
  path="/test-result" 
  element={
    <RequireAuth>
      <TestResult />
    </RequireAuth>
  } 
/>
<Route path="/practice-history" element={
  <RequireAuth>
    <PracticeHistory />
  </RequireAuth>
} />
    <Route
  path="/profile"
  element={
    <RequireAuth>
      <Profile />
    </RequireAuth>
  }
/>
    <Route path="/settings" element={
      <RequireAuth>
        <Settings />
      </RequireAuth>
    } />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;