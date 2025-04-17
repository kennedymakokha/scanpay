import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QRScannerScreen from "../screens/scan";
import LoginScreen from "../screens/auth/login";
import Splash from "../screens/splash";
import Transactions from "../screens/scan/transactions";

const Stack = createNativeStackNavigator();

export function RootStack() {
    return (
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen name="splash" options={{ headerShown: false }} component={Splash} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="home" component={QRScannerScreen} />
            <Stack.Screen name="transactions" component={Transactions} />
        </Stack.Navigator>
    );
}



