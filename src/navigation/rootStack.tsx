import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QRScannerScreen from "../screens/scan";
import LoginScreen from "../screens/auth/login";
import Splash from "../screens/splash";
import Transactions from "../screens/scan/transactions";
import { RootDrawer } from "./rootDrawer";
import AdminDashboard from "../screens/adminDashboard";
import UserDashboard from "../screens/userDashboard";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WalletView from "../screens/wallet";
import SuperAdminDashboard from "../screens/superAdmin";
import Vendor from "../screens/superAdmin/vendor";
import Business from "../screens/superAdmin/categories";
import CreateVendor from "../screens/superAdmin/vendor/createVendor";
import { useToggle } from "../../contexts/ToggleContext";
import { useAuth } from "../../contexts/AuthContext";
const Stack = createNativeStackNavigator();

export function RootStack() {
    const { token } = useAuth();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="splash" options={{}} component={Splash} /> */}
            {token ? (
                <Stack.Screen name="home" options={{}} component={RootDrawer} />
            ) : (
                <Stack.Screen name="login" component={LoginScreen} />
            )}

        </Stack.Navigator>
    );
}


export function ClientStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UserDashboard" component={UserDashboard} />
            <Stack.Screen name="transactions" component={Transactions} />
        </Stack.Navigator>
    );
}
export function AdminStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="adminDashboard" component={AdminDashboard} />
            <Stack.Screen name="Wallet" component={WalletView} />
        </Stack.Navigator>
    );
}
export function SuperAdminStack() {
    const { isEnabled, toggle } = useToggle();
    return (
        <Stack.Navigator screenOptions={{
            headerTransparent: true,
            headerTitleStyle: {
                color: '#d4af37', // Custom title color (indigo-600)
                fontSize: 28,
                fontWeight: 'bold',
            },

        }}>
            <Stack.Screen name="adminDashboard" options={{
                title: "DashBoard",
            }} component={SuperAdminDashboard} />
            <Stack.Screen name="vendor"
                options={({ navigation }) => ({
                    title: "jkhk",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('createbusiness')}
                            style={{ marginRight: 12 }}
                        >
                            <Icon name="plus" size={18} color="#ffaa1d" />
                        </TouchableOpacity>
                    ),
                })}
                component={Vendor} />
            <Stack.Screen
                options={({ navigation }) => ({
                    title: "Business categories",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('createbusiness')}
                            style={{ marginRight: 12 }}
                        >
                            <Icon name="plus" size={18} color="#ffaa1d" />
                        </TouchableOpacity>
                    ),
                })}
                name="businesses" component={Business} />
            <Stack.Screen name="createbusiness" component={CreateVendor} />
        </Stack.Navigator>
    );
}




