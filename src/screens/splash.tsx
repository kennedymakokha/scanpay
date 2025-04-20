import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authorizedFetch } from '../utility/authorisedFetch';
import { RootStackParamList } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OverlayLoader from '../coponents/Loader';

import { useUser } from '../../contexts/userContext';
import { useGetSessionQuery } from '../../services/authApi';


const SplashScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { user, setUser, logout } = useUser();
    const { data: profile, isLoading } = useGetSessionQuery({});
    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (profile) {
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
        <>
            {isLoading && <OverlayLoader />}
        </>
    );
};

export default SplashScreen;
