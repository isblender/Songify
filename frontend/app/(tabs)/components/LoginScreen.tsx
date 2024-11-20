import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../AuthContext'; // Adjust the path to your AuthContext file
import styles from '../../styles/WelcomeStyles'; // Import the styles from WelcomeStyles

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId } = useAuth();

  // Animation value for the fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value: 0

  // Use useEffect to start the fade-in animation when the component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade to opacity 1
      duration: 800, // Duration of the animation in milliseconds
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [fadeAnim]);

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
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="black"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input} 
        placeholder="Password"
        placeholderTextColor="black"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text> 
      </TouchableOpacity>
    </Animated.View>
  );
};

export default LoginScreen;