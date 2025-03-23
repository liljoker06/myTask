const Task = require("../models/Task");
const Day = require("../models/Day");
const { calculateWeeklyProgress } = require("./weeklyController");


// 🔹 Créer une nouvelle tâche
const createTask = async (req, res) => {
  try {
    const { title, description, start_date, end_date, duration } = req.body;

    const newTask = new Task({
      user_id: req.user.id,
      title,
      description,
      start_date,
      end_date,
      duration,
      status: "Not started",
    });

    await newTask.save();

    // ✅ Générer les entrées `Day` pour chaque jour de la tâche
    let currentDate = new Date(start_date);
    const endDate = new Date(end_date);

    while (currentDate <= endDate) {
      await Day.create({
        user_id: req.user.id,
        date: currentDate,
        task_id: newTask._id,
        progress: 0, // Par défaut, aucune progression
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // ✅ Mettre à jour la progression hebdomadaire après ajout d'une nouvelle tâche
    await calculateWeeklyProgress(req.user.id);

    res.status(201).json({ message: "Tâche créée avec succès", task: newTask });
  } catch (error) {
    console.error("❌ Erreur lors de la création de la tâche:", error);
    res.status(500).json({ message: "Erreur lors de la création de la tâche", error: error.message });
  }
};

// 🔹 Récupérer toutes les tâches d'un utilisateur
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user.id }).sort({ start_date: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des tâches:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des tâches", error: error.message });
  }
};

// 🔹 Mettre à jour une tâche
const updateTask = async (req, res) => {
  try {
    const { title, description, start_date, end_date, duration, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      { title, description, start_date, end_date, duration, status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    // ✅ Mettre à jour la progression hebdomadaire après modification
    await calculateWeeklyProgress(req.user.id);

    res.status(200).json({ message: "Tâche mise à jour", task });
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour de la tâche:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche", error: error.message });
  }
};

// 🔹 Mettre à jour le statut d'une tâche
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      { status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    // ✅ Mettre à jour la progression des jours associés
    const progressValue = status === "Completed" ? 100 : status === "In progress" ? 50 : 0;
    await Day.updateMany({ task_id: task._id }, { progress: progressValue });

    // ✅ Mettre à jour la progression hebdomadaire
    await calculateWeeklyProgress(req.user.id);

    res.status(200).json({ message: "Statut de la tâche mis à jour avec succès", task });
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du statut:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du statut", error: error.message });
  }
};

// 🔹 Supprimer une tâche
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });

    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    // ✅ Supprimer aussi les jours associés
    await Day.deleteMany({ task_id: task._id });

    // ✅ Mettre à jour la progression hebdomadaire après suppression
    await calculateWeeklyProgress(req.user.id);

    res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de la tâche:", error);
    res.status(500).json({ message: "Erreur lors de la suppression de la tâche", error: error.message });
  }
};

module.exports = { createTask, updateTask, deleteTask, getTasks, updateTaskStatus };
