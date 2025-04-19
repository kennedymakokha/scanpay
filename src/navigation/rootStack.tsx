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
const Stack = createNativeStackNavigator();

export function RootStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="splash" options={{}} component={Splash} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="home" options={{}} component={RootDrawer} />
            <Stack.Screen name="transactions" component={Transactions} />
           
            <Stack.Screen name="UserDashboard" component={UserDashboard} />

        </Stack.Navigator>
    );
}



