import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authorizedFetch } from '../utility/authorisedFetch';
import { RootStackParamList } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await authorizedFetch('https://api.marapesa.com/api/auth');

                if (res?.userId) {
                    await AsyncStorage.setItem("userId", res?.userId);
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    );
};

export default SplashScreen;
