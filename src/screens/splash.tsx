import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authorizedFetch } from '../utility/authorisedFetch';
import { RootStackParamList } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OverlayLoader from '../coponents/Loader';

import { useUser } from '../../contexts/userContext';

const SplashScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { user, setUser, logout } = useUser();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await authorizedFetch('http://185.113.249.137:5000/api/auth');
                if (res?.userId) {
                    await AsyncStorage.setItem("userId", res?.userId);
                    await AsyncStorage.setItem("role", res?.role);
                    setUser(res)
                    navigation.replace('home');
                } else {
                    navigation.replace('login');
                }
            } catch (e) {
                console.error(e);
                navigation.replace('login');
            }
        };
        checkAuth();
    }, []);

    return (
        <OverlayLoader />
    );
};

export default SplashScreen;
