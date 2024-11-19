import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CameraScreen from "./camera";
import HistoryScreen from "./history";
import { useAuth } from "../AuthContext";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import SplashScreen from "./splashscreen";
import WelcomeScreen from "./WelcomeScreen";
const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const { userId, loading } = useAuth();
  if (loading) { 
     return (
      <SplashScreen />
     )
  }
  return (
    <>
      {userId ? (
        <Tab.Navigator
          tabBarPosition="bottom"
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "rgb(10,10,10)", // Dark background
              opacity: 0.8, // Set opacity
            },
            tabBarIndicatorStyle: {
              backgroundColor: "white", // Indicator color
            },
            tabBarLabelStyle: {
              fontSize: 14, // Font size of the tab labels
              color: "white", // Text color
            },
          }}
          initialRouteName="camera"
        >
          <Tab.Screen
            name="history"
            component={HistoryScreen}
            options={{ title: "History" }}
          />
          <Tab.Screen
            name="camera"
            component={CameraScreen}
            options={{ title: "Camera" }}
          />
        </Tab.Navigator>
      ) : (
        <WelcomeScreen />
      )}
    </>
  );
}
