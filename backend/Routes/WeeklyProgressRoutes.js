const express = require("express");
const router = express.Router();
const WeeklyProgressController = require("../Controllers/weeklyController");
const authMiddleware = require("../middlewares/authMiddleware");

// 🔹 Routes protégées (nécessitent un token)
router.put("/calculate", authMiddleware, WeeklyProgressController.calculateWeeklyProgress);
router.get("/", authMiddleware, WeeklyProgressController.getWeeklyProgress);

module.exports = router;
