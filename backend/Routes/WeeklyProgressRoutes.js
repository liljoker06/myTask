const express = require("express");
const router = express.Router();
const WeeklyProgressController = require("../Controllers/weeklyController");
const authMiddleware = require("../middlewares/authMiddleware");

// 🔹 Route pour récupérer la progression hebdomadaire
router.put("/calculate", authMiddleware, WeeklyProgressController.calculateWeeklyProgress);
router.get("/", authMiddleware, WeeklyProgressController.getWeeklyProgress);

module.exports = router;