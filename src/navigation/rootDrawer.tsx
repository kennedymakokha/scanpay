
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext1";
import { useSocket } from "../../contexts/SocketContext";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import LoginScreen from "../screens/auth/login";
import { AdminStack, ClientStack, SalesStack, SuperAdminStack } from "./rootStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native";
import CustomDrawer from "./customdrawer";
import ProfileScreen from "../screens/profileScreen";
import QRScannerScreen from "../screens/scan";
import HelpSupportScreen from '../screens/helpSupport';
import CustomHeader from '../coponents/customHeader';



export function RootDrawer() {
    const { token, logout } = useAuthContext(); // ✅ OK
    const { socket } = useSocket();             // ✅ OK
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { user } = useSelector((state: any) => state.auth); // ✅ OK
    const Drawer = createDrawerNavigator();
    // ✅ Safely memoize stack component
    const StackComponent = useMemo(() => {
        if (!token) return LoginScreen;
        if (user?.role === 'client') return ClientStack;
        if (user?.role === 'superAdmin' || user?.role === 'sale') return SuperAdminStack;
        if (user?.role === 'admin') return AdminStack;
        if (user?.role === 'sales') return SalesStack;
        return LoginScreen;
    }, [token, user]);

    useEffect(() => {
        if (!user) {
            navigation.replace("login");
        }
    }, [token]);

    useEffect(() => {
        if (user?._id) {
            socket?.emit('join_room', user._id);
        }
    }, [user]);

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerLabelStyle: { color: 'gold', fontSize: 16 },
                drawerActiveTintColor: 'white',
                drawerInactiveTintColor: 'gray',
                drawerActiveBackgroundColor: '#FF6600',
                drawerStyle: {
                    backgroundColor: '#1a1a1a',
                    width: 240,
                },
                drawerType: 'front',
            }}
        >
            <Drawer.Screen
                name="Home"
                component={StackComponent}
                options={({ navigation }) => ({
                    title: "",
                    // headerShown: false,
                    headerRight: () => (
                        user?.role === "client" && (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Scan')}
                                style={{ marginRight: 12 }}
                            >
                                <Icon name="data-matrix-scan" size={18} color="#ffaa1d" />
                            </TouchableOpacity>
                        )
                    ),
                })}
            />
            <Drawer.Screen name="Profile" options={{
                headerShown: false
            }} component={ProfileScreen} />
            <Drawer.Screen name="support"
                options={{
                    header: () => <CustomHeader title="Help & support" />,
                }}
                component={HelpSupportScreen} />
            <Drawer.Screen name="Scan" component={QRScannerScreen} options={{ title: "Scan To Pay" }} />
        </Drawer.Navigator>
    );
}