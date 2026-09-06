"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, removeUser } from "../utils/storage";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.log("Logout request failed", error);
    }

    removeUser();
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="site-header">
      <h1 className="site-title">📊 Project Tracker</h1>
      <nav aria-label="Account navigation">
        {user ? (
          <>
            <span className="user-name">Hello, {user.fullname || user.email}</span>
            <button type="button" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="login-link" href="/login">
              Log in
            </Link>
            <Link className="signup-link" href="/signup">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

