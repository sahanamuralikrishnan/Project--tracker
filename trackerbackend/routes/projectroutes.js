const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get the logged-in user's projects
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not load projects" });
  }
});

// Create a project for the logged-in user
router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Project name is required" });
  }

  try {
    const project = await Project.create({
      name: name.trim(),
      owner: req.user.id,
    });

    res.status(201).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not create project" });
  }
});

// Update a project status
router.put("/:id", authMiddleware, async (req, res) => {
  const { status } = req.body;

  if (!["Todo", "In Progress", "Done"].includes(status)) {
    return res.status(400).json({ message: "Invalid project status" });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.status = status;
    await project.save();

    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update project" });
  }
});

// Delete a project
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not delete project" });
  }
});

module.exports = router;
