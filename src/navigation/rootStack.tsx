import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
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
import CustomHeader from "../coponents/customHeader";
import UserManagement from "../screens/superAdmin/vendor";
import { Text } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import AddVendor from "../screens/superAdmin/vendor/createVendor";
import SalesDashboard from "../screens/sales";
import { useSelector } from "react-redux";



const Stack = createNativeStackNavigator();

export function RootStack() {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="home" options={{}} component={RootDrawer} />

        </Stack.Navigator>
    );
}
export function AuthStack() {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="login" component={LoginScreen} />

        </Stack.Navigator>
    );
}
export function ClientStack() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { user } = useSelector((state: any) => state.auth); // ✅ 
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="UserDashboard"
                options={{
                    headerLeft: () => <CustomHeader title="Cliant area" />,
                    headerStyle:{backgroundColor:"black"},
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Scan')}
                            style={{ marginRight: 12 }}
                        >
                            <Icon name="data-matrix-scan" size={18} color="#ffaa1d" />
                        </TouchableOpacity>

                    ),
                }}
                component={UserDashboard} />
            <Stack.Screen name="transactions" component={Transactions} />
        </Stack.Navigator>
    );
}
export function AdminStack() {
    return (
        <Stack.Navigator screenOptions={{


        }}>
            <Stack.Screen name="adminDashboard"
                options={{
                    header: () => <CustomHeader title="Home" />,
                }}
                component={AdminDashboard} />
            <Stack.Screen
                options={{
                    header: () => <CustomHeader title="My wallet" />,
                }}
                name="Wallet" component={WalletView} />
        </Stack.Navigator>
    );
}
export function SalesStack() {

    return (
        <Stack.Navigator screenOptions={{


        }}>
            <Stack.Screen name="salesDashboard"
                options={{
                    header: () => <CustomHeader title="Sales Dashboard" add />,

                }}
                component={SalesDashboard} />
            <Stack.Screen name="myvendors"
                options={{
                    header: () => <CustomHeader title="Sales Dashboard" add />,

                }}
                component={UserManagement} />
            <Stack.Screen name="createVendor"
                options={{
                    header: () => <CustomHeader title="New Sign up" />,

                }}
                component={AddVendor} />
        </Stack.Navigator>
    );
}
export function SuperAdminStack() {

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
                            style={{ marginRight: 12 }} >
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




