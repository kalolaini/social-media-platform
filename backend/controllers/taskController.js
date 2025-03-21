const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Failed to fetch tasks" });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;

    const task = new Task({
      userId: req.user.id,
      title,
      description,
      deadline,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Failed to create task" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.deadline = req.body.deadline || task.deadline;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Failed to update task" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error: Failed to delete task" });
  }
};
