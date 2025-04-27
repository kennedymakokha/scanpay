import { createDrawerNavigator } from '@react-navigation/drawer';
import QRScannerScreen from '../screens/scan';
import CustomDrawer from './customdrawer';
import { AdminStack, ClientStack, SuperAdminStack } from './rootStack';
import ProfileScreen from '../screens/profileScreen';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/auth/login';
import { useAuth } from '../../contexts/AuthContext';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { useSocket } from '../../contexts/SocketContext';

const Drawer = createDrawerNavigator();

const { token, } = useAuth();
export function RootDrawer() {
    const { socket } = useSocket();

    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const getMainStack = () => {
        if (!token) return LoginScreen; // or null
        if (user?.role === 'client') return ClientStack;
        if (user?.role === 'superAdmin' || user?.role === 'sale') return SuperAdminStack;
        if (user?.role === 'admin') return AdminStack;
        return LoginScreen; 
    };
    useEffect(() => {
        getMainStack()
    }, [token])

    useEffect(() => {
        if (!user) {
            navigation.replace("login")
        }
    }, [token])
    const { user } = useSelector((state: any) => state.auth)

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}

            screenOptions={{
                drawerLabelStyle: {
                    color: 'red', // <-- change drawer text color
                    fontSize: 16,
                },
                drawerActiveTintColor: 'white', // <-- active item text color
                drawerInactiveTintColor: 'gray', // <-- inactive item text color
                drawerActiveBackgroundColor: '#FF6600', // 
                headerTransparent: true,
                // headerTitle: '',
                headerShadowVisible: false, // for iOS
                headerTintColor: '#d4af37', // <-- changes hamburger (and back) icon color

                headerStyle: {

                    elevation: 0, // for Android
                    shadowOpacity: 0, // also iOS
                    backgroundColor: 'transparent', // important for both
                },
                drawerStyle: {
                    backgroundColor: '#1a1a1a',
                    width: 240,
                },
                drawerType: 'front',
            }}
        >
            <Drawer.Screen name="Home"
                options={({ navigation }) => ({
                    title: "Dashboard",
                    headerShown: false,
                    headerRight: () => (
                        <>
                            {user?.role === "client" &&
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Scan')}
                                    style={{ marginRight: 12 }}
                                >
                                    <Icon name="data-matrix-scan" size={18} color="#ffaa1d" />
                                </TouchableOpacity>
                            }
                        </>
                    ),
                })}
                component={getMainStack()}
            />

            <Drawer.Screen name="Profile" component={ProfileScreen} />

            <Drawer.Screen
                options={({ navigation }) => ({
                    title: "Scan To Pay",
                })}
                name="Scan" component={QRScannerScreen} />
        </Drawer.Navigator>
    );
}