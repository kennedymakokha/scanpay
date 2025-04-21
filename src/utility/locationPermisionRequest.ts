import { Alert, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const requestLocationPermission = async (): Promise<{
    granted: boolean;
    position?: any;
    error?: string;
}> => {
    try {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            return await getCurrentLocation();
        } else if (Platform.OS === 'android') {
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
                return await getCurrentLocation();
            } else {
                Alert.alert(
                    'Permission Required',
                    'Please enable location permission in settings to continue.'
                );
                return { granted: false };
            }
        }

        return { granted: false };
    } catch (err: any) {
        console.warn(err);
        return { granted: false, error: err.message };
    }
};

const getCurrentLocation = (): Promise<{
    granted: boolean;
    position?: any
    error?: string;
}> => {
    return new Promise(resolve => {
        Geolocation.getCurrentPosition(
            position => {
                resolve({ granted: true, position });
            },
            error => {
                console.error('Error getting location:', error.message);
                Alert.alert('Error', 'Could not retrieve location.');
                resolve({ granted: false, error: error.message });
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            }
        );
    });
};
