const Task = require("../models/Task");
const Day = require("../models/Day");

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
      status: "Not started", // ✅ Défaut : "Not started"
    });

    await newTask.save();

    // ✅ Générer les entrées `Day` pour chaque jour de la tâche
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      await Day.create({
        user_id: req.user.id,
        date: currentDate,
        task_id: newTask._id,
        progress: 0, // ✅ Par défaut, aucune progression
      });

      currentDate.setDate(currentDate.getDate() + 1); // ✅ Passer au jour suivant
    }

    res.status(201).json({ message: "Tâche créée avec succès", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la tâche", error: error.message });
  }
};


// 🔹 Récupérer toutes les tâches d'un utilisateur
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user.id }).sort({ start_date: 1 });
    res.status(200).json(tasks);
  } catch (error) {
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

    res.status(200).json({ message: "Tâche mise à jour", task });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche", error: error.message });
  }
};


const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      { status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    // ✅ Mettre à jour aussi la progression des jours associés
    const progressValue = status === "Completed" ? 100 : status === "In progress" ? 50 : 0;
    await Day.updateMany({ task_id: task._id }, { progress: progressValue });

    res.status(200).json({ message: "Tâche mise à jour", task });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche", error: error.message });
  }
};

// 🔹 Supprimer une tâche
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });

    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la tâche", error: error.message });
  }
};


module.exports = { createTask, updateTask, deleteTask, getTasks, updateTaskStatus };