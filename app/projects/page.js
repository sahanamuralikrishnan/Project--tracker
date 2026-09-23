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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("updatedAt");
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

  const visibleProjects = projects
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => statusFilter === "All" || p.status === statusFilter)
    .slice()
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
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

      {/* Search / Filter / Sort */}
      <div className="flex gap-4 my-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search projects by name..."
          className="flex-1 border rounded-lg px-3 py-2"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="All">All statuses</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="updatedAt">Sort: Recently updated</option>
          <option value="name">Sort: Name (A-Z)</option>
          <option value="status">Sort: Status</option>
        </select>
      </div>
      {/* Recent Projects */}
      <h2>Recent Projects</h2>
            <ul className="project-list">
        {visibleProjects.length === 0 && <p>No projects match your search/filter.</p>}
        {visibleProjects.map((p) => (
          <li key={p._id} className="project-item">
            <div className="project-info">
              <Link href={`/projects/${p._id}`}>
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
