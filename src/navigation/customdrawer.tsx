import React, { use, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../features/auth/authSlice';
import { useTheme } from '../../contexts/themeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthContext } from '../../contexts/AuthContext1';
const CustomDrawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { user } = useSelector((state: any) => state.auth)
 const { token, logout } = useAuthContext();
  const [data, setData] = useState<any>([
    {
      title: "My Transactions",
      path: "transactions",
      nested: true,
      icon: "swap-horizontal-outline"
    },
    {
      title: "My Scan-points",
      path: "transactions",
      nested: true,
      icon: "data-matrix-scan"
    }
  ])
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch()
  const Adminroutes = [
    {
      title: "My Wallet",
      path: "Wallet",
      nested: true,
      icon: "wallet-sharp"
    },
    {
      title: "Scan",
      path: "Scan",
      icon: "data-matrix-scan"
    }]

  const superAdminroutes = [
    {
      title: "Business Categories",
      path: "businesses",
      nested: true,
      icon: "swap-horizontal-outline"
    },
    {
      title: "clients",
      path: "createbusiness",
      nested: true,
      icon: "users-outline"
    }
  ]
  const salesAdminroutes = [
    {
      title: "My Clients",
      path: "businesses",
      nested: true,
      icon: "users-outline"
    },
  ]

  useEffect(() => {
    if (!token) {
      navigation.navigate('Home', { screen: `login` });
    }
    if (user?.role === "admin") {
      setData(Adminroutes)
    } else if (user?.role === "superAdmin") {
      setData(superAdminroutes)
    } else {
      setData(salesAdminroutes)
    }
  }, [token])

 
  const logoutUser = async () => {
    await logout()
    await AsyncStorage.removeItem('accessToken')
   
  }
  return (
    <View className="flex-1 bg-black py-16 px-5">
      {/* Header */}
      <View className="items-center mb-10">
        <Image
          source={require('../assets/logo.png')}
          className="w-20 h-20 rounded-full mb-2"
        />
        <Text className="text-white text-lg">{user?.phone_number}</Text>
      </View>

      {/* Links */}
      <TouchableOpacity
        className="flex-row items-center my-4"
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home-outline" size={20} color="#fff" />
        <Text className="text-white text-base ml-3">Home</Text>
      </TouchableOpacity>
      {data.map((index: any) => (<TouchableOpacity key={index.title}
        className="flex-row items-center my-4"
        onPress={
          index.nested ? () => navigation.navigate('Home', { screen: `${index.path}` }) :
            () => navigation.navigate(`${index.path}`)}
      >
        {index.title === "My Scan-points" || index.title === "Scan" ? <Icon1 name={index.icon} size={20} color="#fff" /> : <Icon name={index.icon} size={20} color="#fff" />}
        <Text className="text-white text-base ml-3">{index.title}</Text>
      </TouchableOpacity>))
      }

      <TouchableOpacity
        className="flex-row items-center my-4"
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon name="person-outline" size={20} color="#fff" />
        <Text className="text-white text-base ml-3">Profile</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View className="mt-auto border-t border-gold-700 pt-5">
        <TouchableOpacity onPress={toggleTheme}>
          <Text className="text-blue-500 dark:text-blue-400">
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={async () => logoutUser()}>
          <Text className="text-gold-500 uppercase text-center text-base">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
