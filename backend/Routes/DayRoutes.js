const express = require("express");
const router = express.Router();
const DayController = require("../Controllers/DayController");
const authMiddleware = require("../middlewares/authMiddleware");

router.put("/progress", authMiddleware, DayController.updateDayProgress);

module.exports = router;
