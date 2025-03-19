import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TaskSummaryProps {
  title: string;
  count: number;
  color: string;
}

export default function TaskSummary({ title, count, color }: TaskSummaryProps) {
  return (
    <View style={[styles.summaryContainer, { backgroundColor: color }]}>
      <Text style={styles.summaryTitle}>{title}</Text>
      <Text style={styles.summaryCount}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
