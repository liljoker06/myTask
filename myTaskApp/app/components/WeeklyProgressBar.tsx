import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";
import axios from "axios";
import { API_URL } from "@env";
import { useAuth } from "../context/AuthContext";
import { format, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

export default function WeeklyProgressBar({ refreshTasks }) {
  const { authState } = useAuth();
  const [progress, setProgress] = useState(0);

  // ✅ Récupérer les tâches de la semaine
  const fetchWeeklyProgress = async () => {
    try {
      const response = await axios.get(`${API_URL}/task/`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });

      // 📌 Filtrer les tâches de la semaine
      const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); 
      const endWeek = endOfWeek(new Date(), { weekStartsOn: 1 }); 

      const weeklyTasks = response.data.filter((task) =>
        isWithinInterval(new Date(task.start_date), { start: startWeek, end: endWeek })
      );

      const completedTasks = weeklyTasks.filter((task) => task.status === "Completed");

      const progressPercentage = weeklyTasks.length > 0 ? completedTasks.length / weeklyTasks.length : 0;
      setProgress(progressPercentage);
    } catch (error) {
      console.error("❌ Erreur lors du chargement des tâches de la semaine", error);
    }
  };

  // ✅ Mettre à jour la barre à chaque changement de `refreshTasks`
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

// 🎨 Styles
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
