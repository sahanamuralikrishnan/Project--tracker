 "use client";
  import React, { useState } from "react";

  export default function ProjectDetailPage() {
    const [activeTab, setActiveTab] = useState("overview");
     return (
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
            Tasks (6)
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
              <p><span className="font-medium">Created On:</span> May 20, 2024</p>
              <p><span className="font-medium">Last Updated:</span> May 22, 2024</p>
              <p><span className="font-medium">Status:</span> In Progress</p>
              <p><span className="font-medium">Description:</span> Building a full-stack e-commerce website with payment integration.</p>
            </section>

            {/* Progress */}
            <section className="bg-white shadow rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold mb-3">Progress</h2>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div className="bg-[#a8c9ad] h-4 rounded-full w-[60%]"></div>
              </div>
              <p className="text-gray-700">6 / 10 tasks completed</p>
            </section>

            {/* Activity */}
            <section className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-3">Activity</h2>
              <ul className="space-y-2 text-gray-700 list-none">
                <li className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-[#5f8d66] rounded-full"></span>
                  <span>
                    Sahana updated status to <span className="font-medium">In Progress</span> 
                     (2h ago)
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span>
                    You created 2 new tasks
                    (1d ago)
                  </span>
                </li>
              </ul>
            </section>
          </>
        )}

        {/* Tasks Content */}
{activeTab === "tasks" && (
  <section className="w-full bg-white shadow rounded-lg p-10">
    {/* Heading */}
    <h2 className="text-3xl font-bold mb-10">Tasks</h2>

    {/* Progress Bar */}
    <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
      <div className="bg-[#a8c9ad] h-6 rounded-full w-[60%]"></div>
    </div>
    <p className="text-gray-700 mb-10 text-lg font-semibold">
      6 / 10 tasks completed
    </p>

    {/* Task List */}
    <div className="space-y-10 text-gray-700">
      {/* Task Item */}
      <div className="p-6 border rounded-lg shadow-sm">
        <div className="flex items-center space-x-6 mb-8">
          <input type="checkbox" checked readOnly className="w-7 h-7 rounded" />
          <span className="text-lg font-semibold">Research and planning</span>
        </div>
        <div className="mb-8">
          <select
            defaultValue="Done"
            className="border rounded-lg px-5 py-3 text-sm font-medium w-56"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <p className="text-sm text-gray-600">May 18, 2024</p>
      </div>

      <div className="p-6 border rounded-lg shadow-sm">
        <div className="flex items-center space-x-6 mb-8">
          <input type="checkbox" checked readOnly className="w-7 h-7 rounded" />
          <span className="text-lg font-semibold">Design homepage</span>
        </div>
        <div className="mb-8">
          <select
            defaultValue="Done"
            className="border rounded-lg px-5 py-3 text-sm font-medium w-56"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <p className="text-sm text-gray-600">May 19, 2024</p>
      </div>

      <div className="p-6 border rounded-lg shadow-sm">
        <div className="flex items-center space-x-6 mb-8">
          <input type="checkbox" className="w-7 h-7 rounded" />
          <span className="text-lg font-semibold">Setup database</span>
        </div>
        <div className="mb-8">
          <select
            defaultValue="In Progress"
            className="border rounded-lg px-5 py-3 text-sm font-medium w-56"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <p className="text-sm text-gray-600">May 21, 2024</p>
      </div>

      <div className="p-6 border rounded-lg shadow-sm">
        <div className="flex items-center space-x-6 mb-8">
          <input type="checkbox" className="w-7 h-7 rounded" />
          <span className="text-lg font-semibold">Develop product listing page</span>
        </div>
        <div className="mb-8">
          <select
            defaultValue="In Progress"
            className="border rounded-lg px-5 py-3 text-sm font-medium w-56"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <p className="text-sm text-gray-600">May 23, 2024</p>
      </div>

      <div className="p-6 border rounded-lg shadow-sm">
        <div className="flex items-center space-x-6 mb-8">
          <input type="checkbox" className="w-7 h-7 rounded" />
          <span className="text-lg font-semibold">Integrate payment gateway</span>
        </div>
        <div className="mb-8">
          <select
            defaultValue="Todo"
            className="border rounded-lg px-5 py-3 text-sm font-medium w-56"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <p className="text-sm text-gray-600">May 25, 2024</p>
      </div>

      <div className="p-6 border rounded-lg shadow-sm">
        <div className="flex items-center space-x-6 mb-8">
          <input type="checkbox" className="w-7 h-7 rounded" />
          <span className="text-lg font-semibold">Testing and bug fixes</span>
        </div>
        <div className="mb-8">
          <select
            defaultValue="Todo"
            className="border rounded-lg px-5 py-3 text-sm font-medium w-56"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <p className="text-sm text-gray-600">May 28, 2024</p>
      </div>

      <div className="p-6 border rounded-lg shadow-sm">
        <div className="flex items-center space-x-6 mb-8">
          <input type="checkbox" className="w-7 h-7 rounded" />
          <span className="text-lg font-semibold">Deployment</span>
        </div>
        <div className="mb-8">
          <select
            defaultValue="Todo"
            className="border rounded-lg px-5 py-3 text-sm font-medium w-56"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <p className="text-sm text-gray-600">May 30, 2024</p>
      </div>
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
    );
  }