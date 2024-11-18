import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from './AuthContext'; // Adjust the path to your AuthContext file
import LoginScreen from './(tabs)/login'; 
import {NavigationContainer} from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <GestureHandlerRootView>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </AuthProvider>
    </NavigationContainer>
  );
}