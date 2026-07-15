"use client";
import { useState } from "react";
import Link from "next/link";
import { useProjects } from "../context/ProjectsContext";

export default function Projects() {
  const { projects, addProject, removeProject, updateStatus } = useProjects();
  const [newProject, setNewProject] = useState("");

  const total = projects.length;
  const inProgress = projects.filter((p) => p.status === "In Progress").length;
  const completed = projects.filter((p) => p.status === "Done").length;
  const todo = projects.filter((p) => p.status === "Todo").length;

  return (
    <div className="dashboard">
      <h1>📊 Project Dashboard</h1>

      {/* Stats */}
      <div className="stats">
        <StatBox label="Total Projects" value={total} color="green" />
        <StatBox label="In Progress" value={inProgress} color="blue" />
        <StatBox label="Completed" value={completed} color="purple" />
        <StatBox label="Todo" value={todo} color="orange" />
      </div>

      {/* Add Project */}
      <div className="add-project">
        <input
          type="text"
          value={newProject}
          placeholder="Add New Project..."
          onChange={(e) => setNewProject(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
        <button onClick={() => { addProject(newProject); setNewProject(""); }}>
          Add Project
        </button>
      </div>

      {/* Recent Projects */}
      <h2>Recent Projects</h2>
      <ul className="project-list">
        {projects.map((p, i) => (
          <li key={i} className="project-item">
            <div className="project-info">
              {/* ✅ Clickable project name */}
              <Link href={`/projects/${p.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <strong>{p.name}</strong>
              </Link>
              — {p.status} (updated {p.updated})
            </div>

            {/* ✅ Dropdown to update status */}
            <select
              value={p.status}
              onChange={(e) => updateStatus(i, e.target.value)}
              style={{ marginLeft: "10px" }}
              className="border rounded-lg px-3 py-2"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <button className="remove-btn" onClick={() => removeProject(i)}>❌ Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div className={`stat-box ${color}`}>
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  );
}
