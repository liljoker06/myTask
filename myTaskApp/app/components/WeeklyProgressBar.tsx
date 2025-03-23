import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";
import axios from "axios";
import { API_URL } from "@env";
import { useAuth } from "../context/AuthContext";

export default function WeeklyProgressBar({ refreshTasks }) {
  const { authState } = useAuth();
  const [progress, setProgress] = useState(0);

  const fetchWeeklyProgress = async () => {
    try {
      console.log("📡 Fetching weekly progress..."); // ✅ Debug

      // 1️⃣ On récupère TOUTES les tâches de la semaine
      const responseTasks = await axios.get(`${API_URL}/task/`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });

      // 2️⃣ On récupère la progression depuis l'API
      const responseProgress = await axios.get(`${API_URL}/weekly-progress/`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });

      // 3️⃣ Calculer la nouvelle progression avec les nouvelles tâches
      const weeklyTasks = responseTasks.data.filter(task => task.status !== "Deleted");
      const completedTasks = weeklyTasks.filter(task => task.status === "Completed");

      // 4️⃣ Calculer la progression et l'afficher
      const progressPercentage = weeklyTasks.length > 0 ? completedTasks.length / weeklyTasks.length : 0;
      console.log(`📊 Calcul Progression: ${Math.round(progressPercentage * 100)}%`);

      setProgress(progressPercentage);
    } catch (error) {
      console.error("❌ Erreur lors du chargement de la progression hebdomadaire", error);
    }
  };

  // ✅ Met à jour la barre dès que `refreshTasks` change
  useEffect(() => {
    fetchWeeklyProgress();
  }, [refreshTasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Progress</Text>
      <ProgressBar progress={progress} color="#00008B" style={styles.progressBar} />
      <Text style={styles.progressText}>{Math.round(progress * 100)}% Completed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
  },
  progressText: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },
});
