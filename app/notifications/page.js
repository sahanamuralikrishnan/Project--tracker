"use client";

import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const notificationList = [
  {
    id: 1,
    title: "Task reminder",
    message: "Your project planning task is due soon.",
    time: "Today",
    icon: "⏰",
  },
  {
    id: 2,
    title: "Project update",
    message: "Your project is currently in progress.",
    time: "Yesterday",
    icon: "📊",
  },
  {
    id: 3,
    title: "Task completed",
    message: "Research and planning was marked as complete.",
    time: "2 days ago",
    icon: "✅",
  },
];

export default function NotificationsPage() {
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(() =>
    typeof window === "undefined"
      ? true
      : localStorage.getItem("notifications-read") !== "true"
  );

  const markAllAsRead = () => {
    localStorage.setItem("notifications-read", "true");
    setHasUnreadNotifications(false);
  };

  return (
    <ProtectedRoute>
      <div className="notifications-page">
        <div className="notifications-heading">
          <div>
            <h1>🔔 Notification Center</h1>
            <p>Keep track of important project updates.</p>
          </div>
          {hasUnreadNotifications && (
            <button type="button" className="save-btn" onClick={markAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>

        <section className="notification-center-list" aria-label="Notifications">
          {notificationList.map((notification) => (
            <article
              className={`center-notification${hasUnreadNotifications ? " unread" : ""}`}
              key={notification.id}
            >
              <div className="notification-icon" aria-hidden="true">
                {notification.icon}
              </div>
              <div className="center-notification-content">
                <div className="center-notification-title">
                  <h2>{notification.title}</h2>
                  {hasUnreadNotifications && <span className="unread-label">New</span>}
                </div>
                <p>{notification.message}</p>
                <small>{notification.time}</small>
              </div>
            </article>
          ))}
        </section>
      </div>
    </ProtectedRoute>
  );
}
