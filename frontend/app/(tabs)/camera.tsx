import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';

export default function Camera() {
  const navigation = useNavigation();
  const onSwipeDown = () => {
    console.log('test')
    navigation.navigate('history');
  };
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    console.log('flippy')
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  
  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
    }
  }

  return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Image source={require('../../assets/images/flip.png')} style={{width:30, height:30, backgroundColor: 'transparent'}}/>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});