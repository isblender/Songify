import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, Animated, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../AuthContext"; // Adjust the path to your AuthContext file
import styles from "../../styles/WelcomeStyles"; // Import the styles from WelcomeStyles

const SignupScreen = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const { setUserId } = useAuth();

  // Animation value for the fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Use useEffect to start the fade-in animation when the component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Function to handle signup
  const handleSignup = async () => {
    try {
      const response = await fetch("https://imagetosong.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phone, email, password }),
      });
      const data = await response.json();

      if (data.message === "accountExist") {
        Alert.alert("Account Exists", "An account with this phone or email already exists.");
      } else if (data.message === "usernameExist") {
        Alert.alert("Username Exists", "The username you've entered is already in use.");
      } else if (data.message === "newUser") {
        Alert.alert("Signup Successful", "Your account has been created successfully!");
        await AsyncStorage.setItem('userId', data.userId);
        setUserId(data.userId);
      } else {
        Alert.alert("Error", "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Alert.alert("Error", "An error occurred while signing up. Please try again later.");
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={'black'}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        placeholderTextColor={'black'}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={'black'}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={'black'}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create an account</Text>
      </TouchableOpacity>
      {/* Add a Back button */}
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SignupScreen;