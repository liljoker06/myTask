import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns'; // Utilisation de date-fns pour formater la date

export default function DateDisplay() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd MMMM yyyy");

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
