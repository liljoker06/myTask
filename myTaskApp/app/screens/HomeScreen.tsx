import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import DateDisplay from '../components/DateDisplay'; // Importer le composant DateDisplay
import TaskCard from '../components/TaskCard'; // Importer le composant TaskCard
import TaskSummary from '../components/TaskSummary'; // Importer le composant TaskSummary

export default function HomeScreen() {
  const tasks = [
    { id: 1, title: 'Complete React Native Tutorial', status: 'In Progress' },
    { id: 2, title: 'Finish Homework', status: 'Completed' },
    { id: 3, title: 'Buy Groceries', status: 'Pending' },
  ];

  const taskSummary = [
    { title: 'Done', count: 22, color: '#4CAF50' },
    { title: 'In Progress', count: 7, color: '#FF9800' },
    { title: 'Ongoing', count: 12, color: '#F44336' },
    { title: 'Waiting For Review', count: 14, color: '#2196F3' },
  ];

  return (
    <View style={styles.container}>
      {/* Afficher la date dynamique */}
      <View style={styles.dateContainer}>
        <DateDisplay />
      </View>

      {/* Afficher la liste des tâches */}
      <ScrollView contentContainerStyle={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard key={task.id} title={task.title} status={task.status} />
        ))}
      </ScrollView>

      {/* Afficher le résumé des tâches */}
      <View style={styles.summaryContainer}>
        {taskSummary.map((summary, index) => (
          <TaskSummary
            key={index}
            title={summary.title}
            count={summary.count}
            color={summary.color}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dateContainer: {
    marginTop: 20, // Ajoute un peu d'espace au-dessus pour la date
    marginBottom: 20, // Espacement entre la date et la liste des tâches
    width: '100%',
    alignItems: 'center',
  },
  taskList: {
    width: '100%',
    marginVertical: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
