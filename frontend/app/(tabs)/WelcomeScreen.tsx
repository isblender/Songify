import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';

const WelcomeScreen = () => {
  const [selected, setSelected] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Songify!</Text>
      {!selected ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setSelected(true);
              setHasAccount(true); // Set to true when "Sign In" is clicked
            }}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setSelected(true);
              setHasAccount(false); // Set to false when "Sign Up" is clicked
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      ) : hasAccount ? (
        <LoginScreen />
      ) : (
        <SignupScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default WelcomeScreen;