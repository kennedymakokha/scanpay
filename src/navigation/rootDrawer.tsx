import { createDrawerNavigator } from '@react-navigation/drawer';
import QRScannerScreen from '../screens/scan';
import CustomDrawer from './customdrawer';
import Transactions from '../screens/scan/transactions';
import { RootStack } from './rootStack';
import AdminDashboard from '../screens/adminDashboard';
import ProfileScreen from '../screens/profileScreen';
import WalletView from '../screens/wallet';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { authorizedFetch } from '../utility/authorisedFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserDashboard from '../screens/userDashboard';
import { useUser } from '../../contexts/userContext';
const Drawer = createDrawerNavigator();

export function RootDrawer() {
    const { user, setUser, logout } = useUser();


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
                component={user?.role === "client" ? UserDashboard : AdminDashboard} />
            <Drawer.Screen name="transactions" component={Transactions} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Wallet" component={WalletView} />
            <Drawer.Screen
                options={({ navigation }) => ({
                    title: "Scan To Pay",
                })}
                name="Scan" component={QRScannerScreen} />
        </Drawer.Navigator>
    );
}