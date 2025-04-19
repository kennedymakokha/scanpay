import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import { useUser } from '../../contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CustomDrawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { user, setUser, logout } = useUser();
  const Adminroutes = [
    {
      title: "My Wallet",
      path: "Wallet",
      icon: "wallet-sharp"
    },
    {
      title: "Scan",
      path: "Scan",
      icon: "data-matrix-scan"
    }]
  const Userroutes = [
    {
      title: "My Transactions",
      path: "transactions",
      icon: "swap-horizontal-outline"
    },
    {
      title: "My Scan-points",
      path: "transactions",
      icon: "data-matrix-scan"
    }
  ]

  console.log(user)
  return (
    <View className="flex-1 bg-black py-16 px-5">
      {/* Header */}
      <View className="items-center mb-10">
        <Image
          source={require('../assets/logo.png')}
          className="w-20 h-20 rounded-full mb-2"
        />
        <Text className="text-white text-lg">{user?.username}</Text>
      </View>

      {/* Links */}
      <TouchableOpacity
        className="flex-row items-center my-4"
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home-outline" size={20} color="#fff" />
        <Text className="text-white text-base ml-3">Home</Text>
      </TouchableOpacity>
      {Adminroutes.map(index => (<TouchableOpacity key={index.title}
        className="flex-row items-center my-4"
        onPress={() => navigation.navigate(`${index.path}`)}
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
        <TouchableOpacity activeOpacity={1} onPress={async () => { await AsyncStorage.clear(); navigation.navigate("login"); logout }}>
          <Text className="text-gold-500 uppercase text-center text-base">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
