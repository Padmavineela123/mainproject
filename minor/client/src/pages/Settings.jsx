import { useEffect, useState } from "react";
import {
  Brain,
  User,
  Mail,
  Lock,
  Bell,
  Moon,
  Sun,
  Save,
  LogOut,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import "./Settings.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [darkMode, setDarkMode] = useState(
    typeof localStorage !== "undefined" &&
      localStorage.getItem("darkMode") === "true"
  );
  const [notifications, setNotifications] = useState(
    typeof localStorage === "undefined" ||
      localStorage.getItem("notifications") !== "false"
  );
  const [testReminders, setTestReminders] = useState(
    typeof localStorage === "undefined" ||
      localStorage.getItem("testReminders") !== "false"
  );

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!mounted) return;

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        const currentUser = data.user || {};

        setUser({
          username: currentUser.name || "",
          email: currentUser.email || "",
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: currentUser.id || currentUser._id || "",
            name: currentUser.name || "",
            email: currentUser.email || "",
            role: currentUser.role || "user",
          })
        );
      } catch (error) {
        console.error("Unable to load user information:", error);
      }
    };

    loadUser();
  }, [navigate]);

  const handleSave = () => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("notifications", notifications);
    localStorage.setItem("testReminders", testReminders);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className={`settings-page ${darkMode ? "dark" : ""}`}>

      {/* Header */}
      <header className="settings-header">

        <div className="settings-brand">
          <div className="settings-brand-icon">
            <Brain size={27} />
          </div>

          <div>
            <h1>AI Interview Prep</h1>
            <span>Settings</span>
          </div>
        </div>

        <Link to="/dashboard" className="back-dashboard">
          <ChevronLeft size={18} />
          Back to Dashboard
        </Link>

      </header>

      {/* Main */}
      <main className="settings-container">

        <div className="settings-title">
          <h2>Settings</h2>
          <p>
            Manage your account, preferences and interview
            preparation experience.
          </p>
        </div>

        {saved && (
          <div className="saved-message">
            <CheckCircle2 size={20} />
            Settings saved successfully
          </div>
        )}

        {/* Account */}
        <section className="settings-card">

          <div className="section-heading">
            <div className="section-icon">
              <User size={21} />
            </div>

            <div>
              <h3>Account Information</h3>
              <p>Your profile information</p>
            </div>
          </div>

          <div className="settings-form">

            <div className="form-group">
              <label>Username</label>

              <div className="input-wrapper">
                <User size={18} />
                <input
                  type="text"
                  value={user.username}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <div className="input-wrapper">
                <Mail size={18} />
                <input
                  type="email"
                  value={user.email}
                  readOnly
                />
              </div>
            </div>

          </div>

          <p className="settings-note">
            Your username and email are taken from your logged-in
            account.
          </p>

        </section>

        {/* Appearance */}
        <section className="settings-card">

          <div className="section-heading">
            <div className="section-icon">
              {darkMode ? (
                <Moon size={21} />
              ) : (
                <Sun size={21} />
              )}
            </div>

            <div>
              <h3>Appearance</h3>
              <p>Customize how your interview preparation area looks</p>
            </div>
          </div>

          <div className="setting-row">

            <div className="setting-info">
              <div className="setting-icon">
                {darkMode ? (
                  <Moon size={19} />
                ) : (
                  <Sun size={19} />
                )}
              </div>

              <div>
                <strong>Dark Mode</strong>
                <span>
                  Use a darker appearance throughout the settings
                  page.
                </span>
              </div>
            </div>

            <button
              type="button"
              className={`toggle ${
                darkMode ? "active" : ""
              }`}
              onClick={() => setDarkMode((previous) => !previous)}
            >
              <span></span>
            </button>

          </div>

        </section>

        {/* Notifications */}
        <section className="settings-card">

          <div className="section-heading">
            <div className="section-icon">
              <Bell size={21} />
            </div>

            <div>
              <h3>Notifications</h3>
              <p>Control your interview preparation notifications</p>
            </div>
          </div>

          <div className="setting-row">

            <div className="setting-info">

              <div className="setting-icon">
                <Bell size={19} />
              </div>

              <div>
                <strong>Notifications</strong>
                <span>
                  Receive updates and important account
                  notifications.
                </span>
              </div>

            </div>

            <button
              type="button"
              className={`toggle ${
                notifications ? "active" : ""
              }`}
              onClick={() =>
                setNotifications((previous) => !previous)
              }
            >
              <span></span>
            </button>

          </div>

          <div className="setting-row">

            <div className="setting-info">

              <div className="setting-icon">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <strong>Test Reminders</strong>
                <span>
                  Get reminders to continue your interview
                  preparation.
                </span>
              </div>

            </div>

            <button
              type="button"
              className={`toggle ${
                testReminders ? "active" : ""
              }`}
              onClick={() =>
                setTestReminders((previous) => !previous)
              }
            >
              <span></span>
            </button>

          </div>

        </section>

        {/* Password */}
        <section className="settings-card">

          <div className="section-heading">
            <div className="section-icon">
              <Lock size={21} />
            </div>

            <div>
              <h3>Change Password</h3>
              <p>Update your account password</p>
            </div>
          </div>

          <div className="password-form">

            <div className="form-group">
              <label>Current Password</label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

          </div>

          <button
            type="button"
            className="password-button"
          >
            <Lock size={18} />
            Update Password
          </button>

        </section>

        {/* Save */}
        <div className="settings-actions">

          <button
            type="button"
            className="save-button"
            onClick={handleSave}
          >
            <Save size={18} />
            Save Settings
          </button>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </main>
    </div>
  );
}

export default Settings;