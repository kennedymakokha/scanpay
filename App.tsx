import React, { useEffect } from 'react';
import { PermissionsAndroid, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { RootStack } from './src/navigation/rootStack';
import "./global.css"
import './gesture-handler';
import { authorizedFetch } from './src/utility/authorisedFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { UserProvider } from './contexts/userContext';
import { Provider } from 'react-redux';
import { persistor, store } from './store';

import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, useTheme } from './contexts/themeContext';
import { ToggleProvider } from './contexts/ToggleContext';
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


export async function requestLocationPermission() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization(); // iOS only
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
}


function App(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    requestCameraPermission();
    requestLocationPermission()
  }, []);

  const { theme } = useTheme();
  const themeClass = theme === 'dark' ? 'dark' : '';
  return (
    <View className="flex-1 dark bg-black-50">
      <View className={`flex-1 ${themeClass}`}>
        <ToggleProvider>
          <ThemeProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <UserProvider>
                  <RootStack />
                </UserProvider>
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </ToggleProvider>
      </View>

    </View>
  );
}

export default App;
