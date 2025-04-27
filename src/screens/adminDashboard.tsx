import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useGetSessionQuery } from '../services/authApi';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useNavigation } from '@react-navigation/native';

import { useGetlogsQuery } from '../services/stkApi';
import { FormatDate } from '../utility/formatDate';
import { useSocket } from '../../contexts/SocketContext';
// import socket from '../hooks/useSocket';



const AdminDashboard = () => {
  const { socket } = useSocket();
  const [paying, setPaying] = useState(false)
  const { user } = useSelector((state: any) => state.auth)
  const { data, isLoading, isSuccess, error, refetch } = useGetlogsQuery({ page: 1, limit: paying ? 2 : 3 });

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    if (!user) {
      navigation.replace("login")
    }
  }, [])

  useEffect(() => {

    socket?.on("payment-start", (data) => {

      setPaying(data)
    })
  }, [])
  useEffect(() => {

    socket?.on("payment-end", (data) => {
      refetch()
      setPaying(data)
    })
  }, [])

  return (
    <ScrollView className="flex-1 bg-black-50 px-4 pt-[80px]">
      {data === undefined && !isSuccess ? <View className="flex-row flex-wrap justify-between"> {[...Array(4)].map((_, index) => (
        <View key={index} className="w-[48%] bg-gray-300 p-4 rounded-lg mb-4">
          {/* Title Placeholder */}
          <View className="h-4 bg-gray-400 rounded mb-3 w-3/5" />
          {/* Value Placeholder */}
          <View className="h-6 bg-gray-400 rounded w-4/5" />
        </View>))}</View> : <View className="flex-row flex-wrap justify-between">
        <StatCard title="Total Payments" value="Ksh 10,500" color="bg-green-600" />
        <StatCard title="Cash Received" value="Ksh 4,300" color="bg-blue-600" />
        <StatCard title="Pending" value="3" color="bg-yellow-500" />
        <StatCard title="Users" value="205" color="bg-purple-600" />
      </View>}

      {/* Recent Transactions */}
      <Text className="text-lg font-semibold text-white mt-6 mb-2">Recent Transactions</Text>
      {paying && <View className="bg-gray-800 animate-pulse p-4 rounded-lg mb-2 gap-y-1 space-y-2">
        <View className="h-4 w-32 rounded animate-pulse bg-gray-700" ></View>
        <View className="flex-row items-center animate-pulse gap-x-1 space-x-2">
          <View className="h-4 w-20 rounded animate-pulse bg-gray-700" ></View>
          <View className="h-4 w-14 rounded animate-pulse bg-red-400 even:bg-green-700" ></View>
        </View>
        <View className="h-3 w-24 rounded animate-pulse bg-gray-700" ></View>
      </View>}
      {data === undefined && !isSuccess || data?.logs?.length === 0 ? <>
        {[...Array(5)].map((_, index) => (
          <View key={index} className="bg-gray-800 animate-pulse p-4 rounded-lg mb-2 gap-y-1 space-y-2">
            <View className="h-4 w-32 rounded animate-pulse bg-gray-700" ></View>
            <View className="flex-row items-center animate-pulse gap-x-1 space-x-2">
              <View className="h-4 w-20 rounded animate-pulse bg-gray-700" ></View>
              <View className="h-4 w-14 rounded animate-pulse bg-red-400 even:bg-green-700" ></View>
            </View>
            <View className="h-3 w-24 rounded animate-pulse bg-gray-700" ></View>
          </View>
        ))}
      </> :
        data?.logs?.map((item: any) => (<View key={item._id} className="bg-gray-800 p-4 rounded-lg mb-2">
          <Text className="font-semibold text-white">{`+254*******${item?.phone_number?.slice(-3)}`}</Text>
          {/* <Text className="text-white">
            Ksh {item.amount}- <Text className={`${item.ResponseCode === 0 ? "text-green-400" : "text-red-400"}`}>{item.ResultDesc}</Text>
          </Text> */}
          <Text className="text-white">
            {`Ksh ${item.amount} - `}
            <Text className={`${item.ResponseCode === 0 ? "text-green-400" : "text-red-400"}`}>
              {item.ResultDesc}
            </Text>
          </Text>
          <Text className="text-gray-400 text-sm">{FormatDate(item.createdAt) || ''}</Text>
        </View>))}
    </ScrollView>
  );
};

const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
  <View className={`w-[48%] ${color} p-4 rounded-lg mb-4`}>
    <Text className="text-white text-sm">{title}</Text>
    <Text className="text-white text-xl font-bold">{value}</Text>
  </View>
);

export default AdminDashboard;
