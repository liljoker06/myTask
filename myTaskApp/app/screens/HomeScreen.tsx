import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Header from "../components/Header"; // ✅ Header avec la photo et le username
import DateDisplay from "../components/DateDisplay"; // ✅ Affichage de la date du jour
import TaskCard from "../components/TaskCard"; // ✅ Composant d'affichage des tâches
import axios from "axios";
import { API_URL } from "@env";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

export default function HomeScreen() {
  const { authState } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // Date actuelle

  // 🔥 Charger les tâches en cours de la journée actuelle
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/task/`, {
          headers: { Authorization: `Bearer ${authState.token}` },
        });

        // 📌 Filtrer les tâches qui sont en cours aujourd'hui
        const todayTasks = response.data.filter((task) => {
          const startDate = new Date(task.start_date);
          const endDate = new Date(task.end_date);
          const formattedToday = format(currentDate, "yyyy-MM-dd"); // Date du jour au format "2025-03-24"
          const formattedStartDate = format(startDate, "yyyy-MM-dd");
          const formattedEndDate = format(endDate, "yyyy-MM-dd");

          return formattedStartDate <= formattedToday && formattedEndDate >= formattedToday;
        });

        setTasks(todayTasks);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des tâches", error);
      }
    };

    fetchTasks();
  }, [currentDate]); // ⚡ Relancer la requête si la date change

  return (
    <View style={styles.container}>
      {/* ✅ Header avec la photo de profil et username */}
      <Header />

      {/* ✅ Affichage de la date */}
      <DateDisplay onDateChange={setCurrentDate} />

      <Text style={styles.sectionTitle}>Today's Tasks</Text>

      {/* ✅ Liste des tâches du jour */}
      <ScrollView contentContainerStyle={styles.taskList}>
  {tasks.length > 0 ? (
    tasks.map((task) => (
      <TaskCard 
        key={task._id} 
        title={task.title} 
        description={task.description}
        status={task.status} 
      />
    ))
  ) : (
    <Text style={styles.noTaskText}>No tasks for today 🚀</Text>
  )}
</ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
  },
  taskList: {
    width: "100%",
    paddingBottom: 20,
  },
  noTaskText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
});
