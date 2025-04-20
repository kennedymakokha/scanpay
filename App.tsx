import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    requestCameraPermission();
  }, []);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authorizedFetch('http://185.113.249.137:5000/api/auth');

        if (res?.userId) {
          await AsyncStorage.setItem("userId", res?.userId);
          navigation.navigate('home');
        } else {
          navigation.navigate('login');
        }
      } catch (e) {
        console.error(e);
        navigation.navigate('login');
      }
    };
    checkAuth();
  }, []);
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserProvider>
          <RootStack />
        </UserProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
