const Day = require("../models/Day");
const Task = require("../models/Task");

// 🔹 Mettre à jour la progression d'une journée
exports.updateDayProgress = async (req, res) => {
  try {
    const { task_id, date, progress } = req.body;

    let day = await Day.findOne({ user_id: req.user.id, task_id, date });

    if (day) {
      day.progress = progress;
    } else {
      day = new Day({
        user_id: req.user.id,
        task_id,
        date,
        progress,
      });
    }

    await day.save();
    res.status(200).json({ message: "Progression mise à jour", day });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la progression", error: error.message });
  }
};
