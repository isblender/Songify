import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
} from 'expo-camera';
import { useRouter } from 'expo-router';
import { styles } from '../styles/CameraStyles'; // Import styles
import { useAuth } from '../AuthContext';

export default function CameraScreen() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const { userId } = useAuth();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture(): Promise<void> {
    if (cameraRef.current) {
      try {
        const options = {
          quality: 0.7,
          base64: true,
          skipProcessing: false,
        };
        const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync(options);
        //console.log('Photo taken:', photo.base64);
        if (photo.base64 === undefined) {
          console.error('Error taking picture: No photo captured');
          return
        }
        const base64 = photo.base64.split(',')[1]
        console.log(`Uploading image to user ${userId}`)
        console.log('Base64:', base64.slice(0, 10))
        fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            photoBase64: base64
          })
        })
        
        // Handle the photo as needed
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  }
  return (
    <View style={{ flex: 1 }}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          {/* Top Right Buttons */}
          <View style={styles.topRightButtonContainer}>
            {/* User Button */}
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => router.push('/user')}
            >
              <Image
                source={require('../../assets/images/user.png')}
                style={styles.topIcon}
              />
            </TouchableOpacity>
            {/* Flip Camera Button */}
            <TouchableOpacity style={styles.topButton} onPress={toggleCameraFacing}>
              <Image
                source={require('../../assets/images/flip.png')}
                style={styles.topIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Capture Button Centered at the Bottom */}
          <View style={styles.bottomCenterButtonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.outerCircle}>
                <View style={styles.innerCircle} />
              </View>
            </TouchableOpacity>
          </View>
        </CameraView>
    </View>
  );
}