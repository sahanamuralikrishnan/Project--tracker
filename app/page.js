"use client";
import Link from "next/link";



export default function Home() {
  return (
    <div className="home">
      <h1>� Sahana Portfolio Tracker</h1>
      <p>Organize and track your projects with ease.</p>

      {/* Hero Section */}
      <section className="hero">
        <h1>Simplify Your Work And Get More Done</h1>
        <p>Plan, manage, and stay on top of your projects in one calm, focused space.</p>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>✔ Fully Customizable</h3>
          <p>Tailor the dashboard to your workflow.</p>
        </div>
        <div className="feature-card">
          <h3>✔ Organized Layers</h3>
          <p>Keep everything structured and easy to find.</p>
        </div>
        <div className="feature-card">
          <h3>✔ Light Mode</h3>
          <p>Clean, minimal design for focus.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to boost productivity?</h2>
        {/* ✅ Correct navigation link */}
        <Link href="/projects">
          <button className="cta-btn">📊 Go to Project Dashboard</button>
        </Link>
      </section>
    </div>
  );
}
