import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QRScannerScreen from "../screens/scan";
import LoginScreen from "../screens/auth/login";
import Splash from "../screens/splash";

const Stack = createNativeStackNavigator();

export function RootStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="home" component={QRScannerScreen} />
        </Stack.Navigator>
    );
}



