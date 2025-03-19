import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import Logo from '../components/Logo';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { onLogin, onRegister } = useAuth();

  const handleLogin = async () => {
    const result = await onLogin(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const handleRegister = async () => {
    const result = await onRegister(email, username, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      handleLogin();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps='handled'>
        <Logo />
        <Text style={styles.title}>{isRegistering ? 'Create an Account' : 'Welcome!'}</Text>

        {isRegistering && (
          <InputField
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        )}

        <InputField
          placeholder="Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <InputField
          placeholder="Password"
          secureTextEntry={true} // Allows visibility while typing
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {/* Bouton Connexion ou Inscription */}
        <TouchableOpacity
          onPress={isRegistering ? handleRegister : handleLogin}
          style={styles.loginButton}>
          <Text style={styles.loginButtonText}>{isRegistering ? 'Register' : 'Login'}</Text>
        </TouchableOpacity>

        {/* Bascule entre Login et Register */}
        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.toggleText}>
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    color: 'blue',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
