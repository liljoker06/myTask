const cron = require("node-cron");
const Task = require("../models/Task");
const Day = require("../models/Day");
const WeeklyProgress = require("../models/WeeklyProgress");
const { startOfWeek, endOfWeek } = require("date-fns");

// ✅ Fonction pour mettre à jour la progression hebdomadaire
const runWeeklyProgressUpdate = async () => {
  console.log("🔄 Mise à jour de la progression hebdomadaire...");

  try {
    const users = await Task.distinct("user_id");

    for (const userId of users) {
      const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
      const endWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

      const days = await Day.find({
        user_id: userId,
        date: { $gte: startWeek, $lte: endWeek },
      });

      const completedDays = days.filter((day) => day.progress === 100).length;
      const totalDays = days.length;
      const progress = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;

      await WeeklyProgress.findOneAndUpdate(
        { user_id: userId, week_start: startWeek },
        { week_end: endWeek, progress },
        { upsert: true, new: true }
      );
    }

    console.log("✅ Progression hebdomadaire mise à jour !");
  } catch (error) {
    console.error("❌ Erreur dans le cron job de mise à jour de WeeklyProgress", error);
  }
};

// ✅ Planifier l'exécution automatique chaque lundi à minuit
cron.schedule("0 0 * * 1", () => {
  runWeeklyProgressUpdate();
});

// ✅ Exporter la fonction pour l'appeler depuis `server.js`
module.exports = runWeeklyProgressUpdate;
