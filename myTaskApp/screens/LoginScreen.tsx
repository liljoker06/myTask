import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Footer from '../components/Footer';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic for handling login
    if (email === 'test@example.com' && password === 'password') {
      console.log('Login successful');
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Welcome!</Text>

      <InputField
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />

      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Custom Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loginButton: {
    width: '100%',
    paddingVertical: 12,
    marginTop: 16,
    backgroundColor: '#007BFF', // Blue color for the button
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: 'blue',
    marginTop: 8,
    textAlign: 'center',
  },
  registerContainer: {
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  registerText: {
    textAlign: 'center',
  },
  registerLink: {
    color: 'blue',
  },
});
