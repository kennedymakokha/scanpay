import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/navigation/rootStack';
import "./global.css"
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

function App(): React.JSX.Element {
  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
