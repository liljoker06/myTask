const WeeklyProgress = require("../models/WeeklyProgress");
const Task = require("../models/Task");
const { startOfWeek, endOfWeek } = require("date-fns");

// 🔹 Calculer la progression hebdomadaire
const calculateWeeklyProgress = async (userId) => {
  try {
    const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

    // 📌 Récupérer toutes les tâches qui sont actives cette semaine (début OU fin dans la semaine)
    const weeklyTasks = await Task.find({
      user_id: userId,
      $or: [
        { start_date: { $gte: startWeek, $lte: endWeek } },
        { end_date: { $gte: startWeek, $lte: endWeek } },
      ],
    });

    const completedTasks = weeklyTasks.filter((task) => task.status === "Completed").length;
    const progress = weeklyTasks.length > 0 ? (completedTasks / weeklyTasks.length) * 100 : 0;

    // 📌 Mettre à jour ou créer la progression dans la BDD
    await WeeklyProgress.findOneAndUpdate(
      { user_id: userId, week_start: startWeek },
      { week_end: endWeek, progress },
      { upsert: true, new: true }
    );

    console.log(`✅ Progression mise à jour : ${progress.toFixed(2)}%`);
  } catch (error) {
    console.error("❌ Erreur lors du calcul de la progression hebdomadaire", error);
  }
};


// 🔹 Récupérer la progression hebdomadaire actuelle
const getWeeklyProgress = async (req, res) => {
  try {
    const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

    const progress = await WeeklyProgress.findOne({
      user_id: req.user.id,
      week_start: startWeek,
    });

    res.status(200).json(progress || { progress: 0 });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la progression hebdomadaire", error: error.message });
  }
};

module.exports = { calculateWeeklyProgress, getWeeklyProgress };
