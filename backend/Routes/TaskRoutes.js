const express = require("express");
const router = express.Router();
const TaskController = require("../Controllers/TaskController");
const authMiddleware = require("../middlewares/authMiddleware");

// 🔹 Routes protégées (nécessitent un token)
router.post("/create", authMiddleware, TaskController.createTask);
router.get("/", authMiddleware, TaskController.getTasks);
router.put("/:id", authMiddleware, TaskController.updateTask);
router.delete("/:id", authMiddleware, TaskController.deleteTask);
router.patch("/:id/status", authMiddleware, TaskController.updateTaskStatus);

module.exports = router;
