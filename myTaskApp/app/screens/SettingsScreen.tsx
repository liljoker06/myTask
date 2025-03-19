import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';  // Importer le hook useAuth

export default function SettingsScreen() {
  const { onLogout } = useAuth();  // Utiliser onLogout pour déconnecter l'utilisateur

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>

      {/* Ajouter un bouton pour déconnecter l'utilisateur */}
      <Button 
        title="Logout" 
        onPress={onLogout} // Appeler la fonction onLogout pour déconnecter
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
