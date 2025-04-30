import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, View } from 'react-native';
import { AuthStack, RootStack } from './src/navigation/rootStack';
import "./global.css"
import './gesture-handler';
import { UserProvider } from './contexts/userContext';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, useTheme } from './contexts/themeContext';
import { ToggleProvider } from './contexts/ToggleContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { API_URL } from '@env';
import { AuthProvider } from './contexts/AuthContext1';
import { getMessaging, getToken, onMessage } from '@react-native-firebase/messaging';
const baseUrl = `${API_URL}/api`;
import { GestureHandlerRootView } from 'react-native-gesture-handler';
;
import { SocketProvider } from './contexts/SocketContext';
import { getApp } from '@react-native-firebase/app';
import { useTokenExpiryWatcher } from './src/hooks/useTokenExpiryWatcher';
import { useAuthContext } from './contexts/AuthContext1';
import { Text } from 'react-native';
import { RootDrawer } from './src/navigation/rootDrawer';
import OverlayLoader from './src/coponents/Loader';
function App(): React.JSX.Element {
  const [loading, setLoading] = useState(true)
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


  useEffect(() => {
    requestCameraPermission();
    requestLocationPermission()
    getLocationPermission()

  }, []);


  useEffect(() => {
    const fetchToken = async () => {
      try {
        const app = getApp();
        const messaging = getMessaging(app);
        const fcmToken = await getToken(messaging);
        await AsyncStorage.setItem('fcmToken', fcmToken);
        // console.log('FCM Token:', fcmToken);
      } catch (error) {
        console.error('Error fetching FCM token:', error);
      }
    };

    fetchToken();

    const unsubscribe = onMessage(getMessaging(getApp()), async (remoteMessage) => {
      console.log('Received foreground push:', remoteMessage);
    });

    return unsubscribe;
  }, []);
  const AppWithAuth = () => {
    const { token, logout } = useAuthContext();
    console.log(token)
    useTokenExpiryWatcher(token, logout);


    useTokenExpiryWatcher(token, logout); // 👈 auto-logout watcher

    return token ? <RootDrawer /> : <AuthStack />;

  };
 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4000);
  }, [])
  

  return (
    <View className="flex-1 dark bg-black-50">
      {loading && <OverlayLoader />}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SocketProvider>
          <ToggleProvider>
            <ThemeProvider>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <UserProvider>
                    <AppWithAuth />
                  </UserProvider>
                </PersistGate>
              </Provider>
            </ThemeProvider>
          </ToggleProvider>
        </SocketProvider>

      </GestureHandlerRootView>
    </View>
  );
}

export default App;
