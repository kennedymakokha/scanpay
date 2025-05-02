import { DrawerActions, NavigationProp, useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { RootStackParamList } from "../../types";
function CustomHeader({ title, add }: { title: string, add?: boolean }) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    return (
        <View className="flex-row items-center p-4 bg-black-50 shadow-md">
            <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                className="mr-4"
            >
                <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>
            <View className="flex-row items-center  justify-between w-full ">
                <Text className="text-lg font-semibold text-white tracking-widest">{title}</Text>
                {add && <TouchableOpacity onPress={() => navigation.navigate('createVendor')} style={{ marginRight: 50 }}>
                    <Icon name="user-plus" size={24} color="white" />
                </TouchableOpacity>}
            </View>

        </View>
    );
}

export default CustomHeader
