import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authorizedFetch } from '../utility/authorisedFetch';
import { RootStackParamList } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OverlayLoader from '../coponents/Loader';

import { useUser } from '../../contexts/userContext';
import { useGetSessionQuery } from '../services/authApi';
import { useSelector } from 'react-redux';


const SplashScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { user } = useSelector((state: any) => state.auth)
    useEffect(() => {
        const checkAuth = async () => {
            try {
              const res = await authorizedFetch('http://scanapi.marapesa.com/api/auth');
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
          checkAuth()
    }, []);
    return (
        <>
            <OverlayLoader />
        </>
    );
};

export default SplashScreen;
