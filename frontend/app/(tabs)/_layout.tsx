import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native'
import HomeScreen from './index';
import CameraScreen from './camera';
import HistoryScreen from './history';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator tabBarPosition="bottom" initialRouteName="camera">
        <Tab.Screen name="history" component={HistoryScreen} options={{ title: 'History' }} />
        <Tab.Screen name="camera" component={CameraScreen} options={{ title: 'Camera' }} />
        <Tab.Screen name="index" component={HomeScreen} options={{ title: 'User' }} />
    </Tab.Navigator>
  );
}