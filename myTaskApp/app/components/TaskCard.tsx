// TaskCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TaskCardProps {
  title: string;
  status: 'In Progress' | 'Completed' | 'Pending';
}

export default function TaskCard({ title, status }: TaskCardProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Completed':
        return { backgroundColor: '#4CAF50', textColor: '#fff' };
      case 'In Progress':
        return { backgroundColor: '#FF9800', textColor: '#fff' };
      case 'Pending':
        return { backgroundColor: '#F44336', textColor: '#fff' };
      default:
        return { backgroundColor: '#f0f0f0', textColor: '#000' };
    }
  };

  const { backgroundColor, textColor } = getStatusStyles(status);

  return (
    <View style={[styles.cardContainer, { backgroundColor }]}>
      <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
      <Text style={[styles.cardStatus, { color: textColor }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
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
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
});
