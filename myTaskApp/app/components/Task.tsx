import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TaskProps {
  title: string;
  status: 'In Progress' | 'Completed' | 'Pending';  // Restreindre les valeurs possibles pour le statut
}

export default function Task({ title, status }: TaskProps) {
  // Définir la couleur de fond et de texte en fonction du statut de la tâche
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Completed':
        return { backgroundColor: '#4CAF50', textColor: '#fff' }; // Vert pour terminé
      case 'In Progress':
        return { backgroundColor: '#FF9800', textColor: '#fff' }; // Orange pour en cours
      case 'Pending':
        return { backgroundColor: '#F44336', textColor: '#fff' }; // Rouge pour pas fait
      default:
        return { backgroundColor: '#f0f0f0', textColor: '#000' }; // Par défaut, couleur neutre
    }
  };

  const { backgroundColor, textColor } = getStatusStyles(status);

  return (
    <View style={[styles.taskContainer, { backgroundColor }]}>
      <Text style={[styles.taskTitle, { color: textColor }]}>{title}</Text>
      <Text style={[styles.taskStatus, { color: textColor }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Ombre pour Android
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
});
