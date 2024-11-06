import { Camera } from 'expo-camera';
import { Redirect } from 'expo-router';
import CameraView from './camera'
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  return (
  <GestureHandlerRootView>
    <CameraView />
  </GestureHandlerRootView>)
}