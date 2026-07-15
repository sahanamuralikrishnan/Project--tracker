"use client";
import { createContext, useContext, useState } from "react";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([
    { name: "Project Tracker", status: "In Progress", updated: "2h ago" },
    { name: "Flipkartclone", status: "Todo", updated: "15d ago" },
    { name: "Saloon template", status: "Done", updated: "2d ago" },
    { name: "Netflix clone", status: "Done", updated: "10d ago" },
    { name: "Three.js", status: "Done", updated: "20d ago" },
    { name: "Flipkartrouting", status: "Done", updated: "30d ago" },
  ]);

  const addProject = (name) => {
    if (!name.trim()) return;
    setProjects((prev) => [
      ...prev,
      { name, status: "Todo", updated: "just now" },
    ]);
  };

  const removeProject = (index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const updateStatus = (index, newStatus) => {
    setProjects((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        status: newStatus,
        updated: "just now",
      };
      return updated;
    });
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, removeProject, updateStatus }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectsContext);
