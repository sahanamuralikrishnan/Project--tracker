"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

export default function SettingsPage() {
  const [theme, setTheme] = useState(() =>
    typeof window === "undefined" ? "default" : localStorage.getItem("app-theme") || "default"
  );
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications =
      typeof window === "undefined"
        ? null
        : JSON.parse(localStorage.getItem("notification-settings") || "null");

    return {
      taskReminders: true,
      projectUpdates: true,
      weeklySummary: false,
      ...savedNotifications,
    };
  });
  const [notificationMessage, setNotificationMessage] = useState("");
  const [profile, setProfile] = useState(() => {
    const defaultProfile = {
      fullName: "Sahana Muralikrishnan",
      username: "sahana",
      email: "sahana@example.com",
      role: "Project Manager",
      bio: "Organized, focused, and always tracking the next milestone.",
    };
    const savedProfile =
      typeof window === "undefined"
        ? null
        : JSON.parse(localStorage.getItem("user-profile") || "null");

    return { ...defaultProfile, ...savedProfile };
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "default";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (event) => {
    const nextTheme = event.target.value;
    setTheme(nextTheme);
    localStorage.setItem("app-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = (event) => {
    event.preventDefault();
    localStorage.setItem("user-profile", JSON.stringify(profile));
    alert("Profile saved successfully!");
  };

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleNotificationSave = (event) => {
    event.preventDefault();
    localStorage.setItem("notification-settings", JSON.stringify(notifications));
    setNotificationMessage("Notification preferences saved.");
  };

  return (
    <ProtectedRoute>
      <div className="settings-page">
        <h1>⚙️ Settings</h1>

        <div className="settings-list">
          <div className="settings-card">
            <h2>👤 Profile Settings</h2>
            <form className="profile-form" onSubmit={handleProfileSave}>
              <div className="profile-header">
                <div className="profile-avatar">S</div>
                <div>
                  <strong>{profile.fullName}</strong>
                  <p>{profile.role}</p>
                </div>
              </div>

              <div className="profile-row">
                <label>
                  <span>Full Name</span>
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleProfileChange}
                  />
                </label>

                <label>
                  <span>Username</span>
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleProfileChange}
                  />
                </label>
              </div>

              <div className="profile-row">
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </label>

                <label>
                  <span>Role</span>
                  <input
                    type="text"
                    name="role"
                    value={profile.role}
                    onChange={handleProfileChange}
                  />
                </label>
              </div>

              <label className="full-width">
                <span>Bio</span>
                <textarea
                  name="bio"
                  rows="4"
                  value={profile.bio}
                  onChange={handleProfileChange}
                />
              </label>

              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>

          <div className="settings-card">
            <h2>🌞 Appearance</h2>
            <div className="theme-row">
              <label htmlFor="theme" className="theme-label">
                Theme
              </label>
              <select
                id="theme"
                className="theme-select"
                value={theme}
                onChange={handleThemeChange}
              >
                <option value="default">Forest Green</option>
                <option value="soft">Soft Green</option>
                <option value="deep">Deep Green</option>
              </select>
            </div>
          </div>

          <div className="settings-card notification-settings-card">
            <h2>🔔 Notifications</h2>
            <p>Choose which updates you would like to receive.</p>

            <form className="notification-form" onSubmit={handleNotificationSave}>
              <label className="notification-option">
                <input
                  type="checkbox"
                  name="taskReminders"
                  checked={notifications.taskReminders}
                  onChange={handleNotificationChange}
                />
                <span>
                  <strong>Task reminders</strong>
                  <small>Get reminders about upcoming task deadlines.</small>
                </span>
              </label>

              <label className="notification-option">
                <input
                  type="checkbox"
                  name="projectUpdates"
                  checked={notifications.projectUpdates}
                  onChange={handleNotificationChange}
                />
                <span>
                  <strong>Project updates</strong>
                  <small>Know when a project status changes.</small>
                </span>
              </label>

              <label className="notification-option">
                <input
                  type="checkbox"
                  name="weeklySummary"
                  checked={notifications.weeklySummary}
                  onChange={handleNotificationChange}
                />
                <span>
                  <strong>Weekly progress summary</strong>
                  <small>Review your project progress once a week.</small>
                </span>
              </label>

              <button type="submit" className="save-btn">
                Save Preferences
              </button>
              {notificationMessage && (
                <p className="success-message" role="status">
                  {notificationMessage}
                </p>
              )}
            </form>
          </div>

          <div className="settings-card about-card">
            <h2>ℹ️ About</h2>
            <p>Project Tracker helps you organize projects, manage tasks, and follow your progress in one place.</p>
            <ul className="about-list">
              <li>Create and manage projects</li>
              <li>Track task progress</li>
              <li>View project notifications</li>
              <li>Customize your profile and theme</li>
            </ul>
            <p className="about-details">Version 1.0.0</p>
            <p>Created by Sahana Muralikrishnan</p>
            <p>Built with Next.js, React, and Node.js</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
