"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveUser } from "../utils/storage";
import { API_URL } from "../utils/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      saveUser(data.user);
      setMessage("Login successful");
      router.push("/");
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <section className="login-page">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p>Log in to continue to your account.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Log In</button>
        </form>

        {message && <p>{message}</p>}

        <a href="/forgot-password">Forgot your password?</a>
        <p>
          Do not have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </section>
  );
}
