import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Footer() {
  return (
    <View style={{ marginTop: 24, alignItems: 'center' }}>
      <Text style={{ color: 'blue' }}>Forgot password?</Text>
      <Text style={{ marginVertical: 8 }}>
        Not a member? <Text style={{ color: 'blue' }}>Register now</Text>
      </Text>
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        {/* Google Button */}
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={30} color="#ea4335" />
        </TouchableOpacity>

        {/* Facebook Button */}
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={30} color="#1877f2" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#f2f2f2', // Changez la couleur de fond si nécessaire
    alignItems: 'center',
    justifyContent: 'center',
  },
};