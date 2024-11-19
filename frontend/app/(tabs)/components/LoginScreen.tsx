import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../AuthContext'; // Adjust the path to your AuthContext file
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId } = useAuth();
  const navigation = useNavigation(); // Initialize navigation

  // Function to handle login
  const handleLogin = async () => {
    try {
      // Make a request to your backend API
      const response = await fetch('https://imagetosong.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { userId } = data;
        // Save the userId to AsyncStorage
        await AsyncStorage.setItem('userId', userId);
        // Update the context
        setUserId(userId);
        console.log('Login successful: ', userId);
      } else {
        console.error('Login failed:', data.message);
        // Handle login error (e.g., show a message to the user)
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default LoginScreen;