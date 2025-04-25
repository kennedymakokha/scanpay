import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, View } from 'react-native';
import { RootStack } from './src/navigation/rootStack';
import "./global.css"
import './gesture-handler';
import { UserProvider } from './contexts/userContext';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, useTheme } from './contexts/themeContext';
import { ToggleProvider } from './contexts/ToggleContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { authorizedFetch } from './src/utility/authorisedFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { API_URL } from '@env';
import { AuthProvider } from './contexts/AuthContext';
const baseUrl = `${API_URL}/api`;

function App(): React.JSX.Element {

  const getLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization(); // This shows popup on iOS
      console.log('iOS permission requested');
    } else if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission granted');
        } else {
          console.log('Permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  async function requestLocationPermission() {
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

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
 
  useEffect(() => {
    requestCameraPermission();
    requestLocationPermission()
    getLocationPermission()
 
  }, []);

  const { theme } = useTheme();
  const themeClass = theme === 'dark' ? 'dark' : '';
  return (
    <View className="flex-1 dark bg-black-50">
      <View className={`flex-1 ${themeClass}`}>
        <ToggleProvider>
          <ThemeProvider>
            <AuthProvider>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <UserProvider>
                    <RootStack />
                  </UserProvider>
                </PersistGate>
              </Provider>
            </AuthProvider>
          </ThemeProvider>
        </ToggleProvider>
      </View>

    </View>
  );
}

export default App;
