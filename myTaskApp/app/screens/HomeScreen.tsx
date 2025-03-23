import React, { useState, useEffect } from "react"; // ✅ Ajout de useEffect
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Header from "../components/Header";
import DateDisplay from "../components/DateDisplay";
import TaskCard from "../components/TaskCard";
import TaskDetailSidebar from "../components/TaskDetailSidebar"; 
import axios from "axios";
import { API_URL } from "@env";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

export default function HomeScreen() {
  const { authState } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // ✅ Charger les tâches du jour
  const fetchTasks = async () => {
    try {
      console.log("📡 Fetching tasks from API..."); // ✅ Debug

      const response = await axios.get(`${API_URL}/task/`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });

      console.log("✅ API Response:", response.data); // ✅ Debug API

      const todayTasks = response.data.filter((task) => {
        const startDate = new Date(task.start_date);
        const endDate = new Date(task.end_date);
        const formattedToday = format(currentDate, "yyyy-MM-dd");
        const formattedStartDate = format(startDate, "yyyy-MM-dd");
        const formattedEndDate = format(endDate, "yyyy-MM-dd");

        return formattedStartDate <= formattedToday && formattedEndDate >= formattedToday;
      });

      console.log("🎯 Tasks filtered for today:", todayTasks); // ✅ Debug Filtrage

      setTasks(todayTasks);
    } catch (error) {
      console.error("❌ Erreur lors du chargement des tâches", error);
    }
  };

  // ✅ Appeler fetchTasks() au chargement du composant et quand la date change
  useEffect(() => {
    fetchTasks();
  }, [currentDate]); // ✅ Recharge les tâches quand la date change

  // ✅ Ouvrir la Sidebar
  const openSidebar = (task) => {
    setSelectedTask(task);
    setSidebarVisible(true);
  };

  // ✅ Fermer la Sidebar
  const closeSidebar = () => {
    setSidebarVisible(false);
    setSelectedTask(null);
  };

  return (
    <View style={styles.container}>
      <Header />
      <DateDisplay onDateChange={setCurrentDate} />

      <Text style={styles.sectionTitle}>Today's Tasks</Text>

      <ScrollView contentContainerStyle={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard 
              key={task._id} 
              title={task.title} 
              description={task.description} 
              status={task.status} 
              onPress={() => openSidebar(task)}
            />
          ))
        ) : (
          <Text style={styles.noTaskText}>
            {tasks.length === 0 ? "No tasks for today 🚀" : "Loading tasks..."}
          </Text>
        )}
      </ScrollView>

      {/* ✅ Sidebar des détails de la tâche */}
      <TaskDetailSidebar visible={sidebarVisible} onClose={closeSidebar} task={selectedTask} />
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
