"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProjectStatus,
  createProject,
  deleteProject,
  fetchProjects,
} from "../store/projectsSlice";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Projects() {
  const dispatch = useDispatch();
  const { items: projects, loading, error } = useSelector(
    (state) => state.projects
  );
  const [newProject, setNewProject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!newProject.trim()) return;

    try {
      await dispatch(createProject(newProject)).unwrap();
      setNewProject("");
      setMessage("Project created");
    } catch (requestError) {
      setMessage(requestError.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(changeProjectStatus({ id, status })).unwrap();
    } catch (requestError) {
      setMessage(requestError.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProject(id)).unwrap();
      setMessage("Project deleted");
    } catch (requestError) {
      setMessage(requestError.message);
    }
  };

  const total = projects.length;
  const inProgress = projects.filter((p) => p.status === "In Progress").length;
  const completed = projects.filter((p) => p.status === "Done").length;
  const todo = projects.filter((p) => p.status === "Todo").length;

  return (
    <ProtectedRoute>
    <div className="dashboard">
      <h1>📊 Project Dashboard</h1>

      {/* Stats */}
      <div className="stats">
        <StatBox label="Total Projects" value={total} color="green" />
        <StatBox label="In Progress" value={inProgress} color="green" />
        <StatBox label="Completed" value={completed} color="green" />
        <StatBox label="Todo" value={todo} color="green" />
      </div>

      {/* Add Project */}
      <form className="add-project" onSubmit={handleCreate}>
        <input
          type="text"
          value={newProject}
          placeholder="Add New Project..."
          onChange={(e) => setNewProject(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
        <button type="submit" disabled={loading}>
          Add Project
        </button>
      </form>

      {loading && <p>Loading projects...</p>}
      {(error || message) && <p>{error || message}</p>}

      {/* Recent Projects */}
      <h2>Recent Projects</h2>
      <ul className="project-list">
        {projects.map((p) => (
          <li key={p._id} className="project-item">
            <div className="project-info">
              <Link href={`/projects/${p.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <strong>{p.name}</strong>
              </Link>
              — {p.status} (updated {new Date(p.updatedAt).toLocaleDateString()})
            </div>

            <select
              value={p.status}
              onChange={(e) => handleStatusChange(p._id, e.target.value)}
              style={{ marginLeft: "10px" }}
              className="border rounded-lg px-3 py-2"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <button className="remove-btn" onClick={() => handleDelete(p._id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
    </ProtectedRoute>
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
