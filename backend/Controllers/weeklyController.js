const WeeklyProgress = require("../models/WeeklyProgress");
const Day = require("../models/Day");

// 🔹 Calculer la progression hebdomadaire
exports.calculateWeeklyProgress = async (req, res) => {
  try {
    const { week_start, week_end } = req.body;

    // Vérifier si un enregistrement existe déjà pour cette semaine
    let weeklyProgress = await WeeklyProgress.findOne({
      user_id: req.user.id,
      week_start,
      week_end,
    });

    // Récupérer toutes les progressions journalières de la semaine
    const dailyProgress = await Day.find({
      user_id: req.user.id,
      date: { $gte: week_start, $lte: week_end },
    });

    // Calculer la progression moyenne
    const totalProgress = dailyProgress.reduce((acc, day) => acc + day.progress, 0);
    const averageProgress = dailyProgress.length > 0 ? totalProgress / dailyProgress.length : 0;

    if (weeklyProgress) {
      weeklyProgress.progress = averageProgress;
    } else {
      weeklyProgress = new WeeklyProgress({
        user_id: req.user.id,
        week_start,
        week_end,
        progress: averageProgress,
      });
    }

    await weeklyProgress.save();

    res.status(200).json({ message: "Progression hebdomadaire mise à jour", weeklyProgress });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du calcul de la progression hebdomadaire", error: error.message });
  }
};

// 🔹 Récupérer la progression hebdomadaire d'un utilisateur
exports.getWeeklyProgress = async (req, res) => {
  try {
    const weeklyProgress = await WeeklyProgress.find({ user_id: req.user.id }).sort({ week_start: -1 });

    res.status(200).json(weeklyProgress);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la progression hebdomadaire", error: error.message });
  }
};
