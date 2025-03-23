const cron = require("node-cron");
const Task = require("../models/Task"); 
const mongoose = require("mongoose");
require("dotenv").config(); 

// Fonction pour mettre à jour les statuts des tâches
const updateTaskStatuses = async () => {
  console.log("🔄 Running cron job: Updating task statuses...");

  try {
    const currentDate = new Date();

    await Task.updateMany(
      { start_date: { $lte: currentDate }, end_date: { $gt: currentDate }, status: "Not started" },
      { status: "In progress" }
    );

    await Task.updateMany(
      { end_date: { $lte: currentDate }, status: "In progress" },
      { status: "Completed" }
    );

    console.log("✅ Task statuses updated successfully.");
  } catch (error) {
    console.error("❌ Error updating task statuses:", error);
  }
};

cron.schedule("* * * * *", updateTaskStatuses);

console.log("🕒 Task Status Cron Job initialized.");

module.exports = updateTaskStatuses;
