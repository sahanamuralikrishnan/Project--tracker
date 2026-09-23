const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
// Get all tasks for a given project
router.get("/", authMiddleware, async (req, res) => {
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({ message: "projectId is required" });
  }

  try {
      const tasks = await Task.find({ project: projectId }).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not load tasks" });
  }
});
// Create a task for a project
router.post("/", authMiddleware, async (req, res) => {
  const { title, projectId, assignee, dueDate } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Task title is required" });
  }
  if (!projectId) {
    return res.status(400).json({ message: "projectId is required" });
  }
  try {
     const task = await Task.create({
      title: title.trim(),
      project: projectId,
      owner: req.user.id,
      assignee: assignee || "",
      dueDate: dueDate || undefined,
    });
    res.status(201).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not create task" });
  }
});
// Update a task's status
router.put("/:id", authMiddleware, async (req, res) => {
  const { status, assignee, dueDate } = req.body;
  if (status && !["Todo", "In Progress", "Done"].includes(status)) {
    return res.status(400).json({ message: "Invalid task status" });
  }
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (status) task.status = status;
    if (assignee !== undefined) task.assignee = assignee;
    if (dueDate !== undefined) task.dueDate = dueDate || undefined;
    await task.save();
    res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update task" });
  }
});
// Delete a task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
      const task = await Task.findOneAndDelete({ _id: req.params.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not delete task" });
  }
});

module.exports = router;
