import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';
import styles from '../styles/WelcomeStyles';

const WelcomeScreen = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  // Animation values for position, opacity of buttons, and opacity of the login form
  const blockPosition = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity animation for the login form
  const buttonOpacity = useRef(new Animated.Value(1)).current; // Opacity animation for the buttons

  // Function to handle animation
  const handlePress = (accountStatus) => {
    setHasAccount(accountStatus);

    // Start the position animation
    Animated.timing(blockPosition, {
      toValue: -150, // Adjust this value to move the block up
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setShowComponent(true);
      // Start the fade-in animation for the login/signup form
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in the login/signup form
        duration: 500,
        useNativeDriver: true,
      }).start();
    });

    // Fade out the buttons
    Animated.timing(buttonOpacity, {
      toValue: 0, // Make the buttons fully transparent
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.block,
          { transform: [{ translateY: blockPosition }] },
        ]}
      >
        <Text style={styles.title}>Songify</Text>
        {/* Animated button container */}
        <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacity }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(true)}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(false)}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
        {showComponent && (
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          {hasAccount ? <LoginScreen /> : <SignupScreen />}
        </Animated.View>
      )}
      </Animated.View>
      {/* Render LoginScreen or SignupScreen with opacity animation */}
    </View>
  );
};

export default WelcomeScreen;