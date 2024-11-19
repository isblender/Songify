import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../AuthContext"; // Adjust the path to your AuthContext file
import { useNavigation } from "@react-navigation/native";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const { setUserId } = useAuth();
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, phone, email, password }),
      });
      const data = await response.json();

      if (data.message === "accountExist") {
        Alert.alert(
          "Account Exists",
          "An account with this phone or email already exists."
        );
      } else if (data.message === "usernameExist") {
        Alert.alert(
          "Username Exists",
          "The username you've entered is already in use."
        );
      } else if (data.message === "newUser") {
        Alert.alert(
          "Signup Successful",
          "Your account has been created successfully!"
        );
        setUserId(data.userId);

        navigation.navigate("index");
      } else {
        Alert.alert("Error", "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Alert.alert(
        "Error",
        "An error occurred while signing up. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
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
      <Button title="Create an account" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default SignupScreen;
