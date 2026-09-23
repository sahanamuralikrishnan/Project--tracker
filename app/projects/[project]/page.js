"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import { API_URL } from "../../utils/api";

export default function ProjectDetailPage() {
  const { project: projectId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [tasksError, setTasksError] = useState("");
   const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");



  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Could not load project");
          return;
        }

        setProject(data.project);
      } catch (err) {
        setError("Server error. Please try again.");
      }
    };
    if (projectId) loadProject();
  }, [projectId]);

  const loadTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks?projectId=${projectId}`, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(data.tasks);
        setTasksError("");
      } else {
        setTasksError(data.message || "Could not load tasks");
      }
    } catch (err) {
      setTasksError("Server error while loading tasks. Please try again.");
    }
  };
useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-param-change effect
  if (projectId) loadTasks();
}, [projectId]);
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTaskTitle,
        projectId,
        assignee: newTaskAssignee,
        dueDate: newTaskDueDate,
      }),
    });

    setNewTaskTitle("");
    setNewTaskAssignee("");
    setNewTaskDueDate("");
    loadTasks();
  };


  const handleTaskStatusChange = async (taskId, status) => {
    await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadTasks();
  };

  const handleTaskDelete = async (taskId) => {
    await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: "DELETE",
      credentials: "include",
    });
    loadTasks();
  };


  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!project) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <ProtectedRoute>
    <div className="p-6">
      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-2 font-medium border-b-2 transition-colors duration-200 ${
            activeTab === "overview"
              ? "border-[#5f8d66] text-[#5f8d66] font-semibold"
              : "border-transparent text-gray-600 hover:text-[#5f8d66] hover:border-[#a8c9ad]"
          }`}
        >
          Overview
        </button>

          <button
            onClick={() => setActiveTab("tasks")}
            className={`pb-2 font-medium ${
              activeTab === "tasks"
                ? "border-b-2 border-[#5f8d66]"
                : "text-gray-600 hover:text-[#5f8d66]"
            }`}
          >
            Tasks ({tasks.length})
          </button>
          <button
            onClick={() => setActiveTab("assistant")}
            className={`pb-2 font-medium ${
              activeTab === "assistant"
                ? "border-b-2 border-[#5f8d66]"
                : "text-gray-600 hover:text-[#5f8d66]"
            }`}
          >
            AI Assistant
          </button>
        </div>

        {/* Overview Content */}
        {activeTab === "overview" && (
          <>
            <section className="bg-white shadow rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold mb-3">Project Info</h2>
              <p><span className="font-medium">Name:</span> {project.name}</p>
              <p><span className="font-medium">Created On:</span> {new Date(project.createdAt).toLocaleDateString()}</p>
              <p><span className="font-medium">Last Updated:</span> {new Date(project.updatedAt).toLocaleDateString()}</p>
              <p><span className="font-medium">Status:</span> {project.status}</p>
            </section>
          </>
        )}
        {/* Tasks Content */}
{activeTab === "tasks" && (
  <section className="w-full bg-white shadow rounded-lg p-10">
    {/* Heading */}
    <h2 className="text-3xl font-bold mb-10">Tasks</h2>

    {/* Progress Bar */}
    {(() => {
      const doneCount = tasks.filter((t) => t.status === "Done").length;
      const percent = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;
      return (
        <>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
            <div
              className="bg-[#a8c9ad] h-6 rounded-full"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <p className="text-gray-700 mb-10 text-lg font-semibold">
            {doneCount} / {tasks.length} tasks completed
          </p>
        </>
      );
    })()}
        {/* Add Task */}
    <form onSubmit={handleCreateTask} className="flex gap-4 mb-10">
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 border rounded-lg px-5 py-3"
      />
      <input
        type="text"
        value={newTaskAssignee}
        onChange={(e) => setNewTaskAssignee(e.target.value)}
        placeholder="Assignee"
        className="w-40 border rounded-lg px-5 py-3"
      />
      <input
        type="date"
        value={newTaskDueDate}
        onChange={(e) => setNewTaskDueDate(e.target.value)}
        className="w-48 border rounded-lg px-5 py-3"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-[#5f8d66] text-white rounded-lg"
      >
        Add Task
      </button>
    </form>

    {/* Task List */}
    <div className="space-y-10 text-gray-700">
      {tasksError && <p className="text-red-600">{tasksError}</p>}
      {!tasksError && tasks.length === 0 && <p>No tasks yet. Add one above.</p>}

      {tasks.map((task) => (
        <div key={task._id} className="p-6 border rounded-lg shadow-sm">
          <div className="flex items-center space-x-6 mb-8">
            <input
              type="checkbox"
              checked={task.status === "Done"}
              readOnly
              className="w-7 h-7 rounded"
            />
            <span className="text-lg font-semibold">{task.title}</span>
          </div>
          <div className="mb-8 flex items-center gap-4">
            <select
              value={task.status}
              onChange={(e) => handleTaskStatusChange(task._id, e.target.value)}
              className="border rounded-lg px-5 py-3 text-sm font-medium w-56"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <button
              onClick={() => handleTaskDelete(task._id)}
              className="text-sm text-red-600 font-medium"
            >
              Remove
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {task.assignee && <>Assigned to: {task.assignee} · </>}
            {task.dueDate && <>Due: {new Date(task.dueDate).toLocaleDateString()} · </>}
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  </section>
)}

  {/* AI Assistant Content */}
  {activeTab === "assistant" && (
    <section className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">AI Task Generator ✨</h2>
      <p className="text-gray-700 mb-6">
        Let AI suggest tasks for your project based on best practices.
      </p>

      {/* Input Box */}
      <label className="block text-gray-700 font-medium mb-3">
        What do you want to generate?
      </label>
      <input
        type="text"
        placeholder="Suggest tasks for building an e-commerce website"
        className="w-full border rounded-lg p-3 mb-6"
      />

      {/* Generate Button */}
      <button className="px-6 py-2 bg-[#5f8d66] text-white rounded-lg mb-10">
        Generate Tasks
      </button>

      {/* Suggested Tasks */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-5">Suggested Tasks</h3>
        <ul className="space-y-6 list-none">
          {/* Task 1 */}
          <li className="flex items-center justify-between bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <input type="checkbox" className="w-5 h-5" />
              <span className="font-medium">User authentication (login/signup)</span>
            </div>
            <div className="flex items-center space-x-6">
              <select
                className="border rounded-lg p-2 text-sm font-semibold text-[#5f8d66]"
                defaultValue="Done"
              >
                <option className="text-[#5f8d66]">Todo</option>
                <option className="text-[#5f8d66]">In Progress</option>
                <option className="text-[#5f8d66]">Done</option>
              </select>
              <span className="text-sm text-gray-600">May 18, 2026</span>
            </div>
          </li>

          {/* Task 2 */}
          <li className="flex items-center justify-between bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <input type="checkbox" className="w-5 h-5" />
              <span className="font-medium">Product search and filtering</span>
            </div>
            <div className="flex items-center space-x-6">
              <select
                className="border rounded-lg p-2 text-sm font-semibold text-[#5f8d66]"
                defaultValue="Done"
              >
                <option className="text-[#5f8d66]">Todo</option>
                <option className="text-[#5f8d66]">In Progress</option>
                <option className="text-[#5f8d66]">Done</option>
              </select>
              <span className="text-sm text-gray-600">May 19, 2026</span>
            </div>
          </li>

          {/* Task 3 */}
          <li className="flex items-center justify-between bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <input type="checkbox" className="w-5 h-5" />
              <span className="font-medium">Shopping cart functionality</span>
            </div>
            <div className="flex items-center space-x-6">
              <select
                className="border rounded-lg p-2 text-sm font-semibold text-[#5f8d66]"
                defaultValue="In Progress"
              >
                <option className="text-[#5f8d66]">Todo</option>
                <option className="text-[#5f8d66]">In Progress</option>
                <option className="text-[#5f8d66]">Done</option>
              </select>
              <span className="text-sm text-gray-600">May 21, 2025</span>
            </div>
          </li>

          {/* Task 4 */}
          <li className="flex items-center justify-between bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <input type="checkbox" className="w-5 h-5" />
              <span className="font-medium">Order management system</span>
            </div>
            <div className="flex items-center space-x-6">
              <select
                className="border rounded-lg p-2 text-sm font-semibold text-[#5f8d66]"
                defaultValue="Todo"
              >
                <option className="text-[#5f8d66]">Todo</option>
                <option className="text-[#5f8d66]">In Progress</option>
                <option className="text-[#5f8d66]">Done</option>
              </select>
              <span className="text-sm text-gray-600">May 23, 2026</span>
            </div>
          </li>

          {/* Task 5 */}
          <li className="flex items-center justify-between bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <input type="checkbox" className="w-5 h-5" />
              <span className="font-medium">Email notifications for orders</span>
            </div>
            <div className="flex items-center space-x-6">
              <select
                className="border rounded-lg p-2 text-sm font-semibold text-[#5f8d66]"
                defaultValue="Todo"
              >
                <option className="text-[#5f8d66]">Todo</option>
                <option className="text-[#5f8d66]">In Progress</option>
                <option className="text-[#5f8d66]">Done</option>
              </select>
              <span className="text-sm text-gray-600">May 25, 2025</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )}
      </div>
    </ProtectedRoute>
  );
}
