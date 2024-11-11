import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from './AuthContext'; // Adjust the path to your AuthContext file
import LoginScreen from './(tabs)/login'; 

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}