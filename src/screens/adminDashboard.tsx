import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { useGetlogsQuery } from '../services/stkApi';
import { FormatDate } from '../utility/formatDate';
import { useSocket } from '../../contexts/SocketContext';

const AdminDashboard = () => {
  const { socket } = useSocket();
  const [paying, setPaying] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const {
    data,
    isLoading,
    isSuccess,
    error,
    refetch,
    isFetching,
  } = useGetlogsQuery({ page: 1, limit: paying ? 2 : 3 });

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();
 
  useEffect(() => {
    if (!user) {
      navigation.replace('login');
    }
  }, [user, navigation]);

  useEffect(() => {
    socket?.on('payment-start', (data) => {
      setPaying(data);
    });
    return () => {
      socket?.off('payment-start');
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('payment-end', async (data) => {
      await refetch();
      setPaying(data);
    });
    return () => {
      socket?.off('payment-end');
    };
  }, [socket, refetch]);

  const renderItem = useCallback(({ item }: any) => (
    <View className="bg-gray-800 p-4 gap-y-2 rounded-lg mb-2">
      <Text className="font-semibold text-white">
        {`+254*******${item.phone_number.slice(-3)}`}
      </Text>
      <View className="flex-row">
        <Text className="text-white">{`Ksh ${item.amount} `}</Text>
        <Text
          className={`${item.ResponseCode === 0 ? 'text-green-400' : 'text-red-400'
            } max-w-[250px] text-wrap`}
        >
          {item.ResultDesc}
        </Text>
      </View>
      <Text className="text-gray-400 text-sm">
        {FormatDate(item.createdAt) || ''}
      </Text>
    </View>
  ), []);

  const keyExtractor = useCallback((item: any) => item._id, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black-50 px-4 pt-14">
      {/* Statistics */}
      <View className="flex-row flex-wrap justify-between mb-6">
        <StatCard title="Total Payments" value="Ksh 10,500" color="bg-green-600" />
        <StatCard title="Cash Received" value="Ksh 4,300" color="bg-blue-600" />
        <StatCard title="Pending" value="3" color="bg-yellow-500" />
        <StatCard title="Users" value="205" color="bg-purple-600" />
      </View>

      {/* Recent Transactions Header */}
      <Text className="text-lg font-semibold text-white mb-2">
        Recent Transactions
      </Text>

      {paying && (
        <View className="bg-gray-800 animate-pulse p-4 rounded-lg mb-2">
          <ActivityIndicator color="red" />
        </View>
      )}

      <FlatList
        data={isLoading ? [...Array(10)] : data?.logs}
        keyExtractor={(item, index) => isLoading ? index.toString() : item?._id}
        renderItem={isLoading ? LoaderCard : renderItem}
        onRefresh={refetch}
        refreshing={isFetching}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <View className="mt-4">
            <Text className="text-gray-400 text-center">
              No transactions found.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
  <View className={`w-[48%] ${color} p-4 rounded-lg mb-4`}>
    <Text className="text-white text-sm">{title}</Text>
    <Text className="text-white text-xl font-bold">{value}</Text>
  </View>
);

const LoaderCard = () => (
  <View className="bg-gray-800 animate-pulse p-4 gap-y-3 rounded-lg mb-2 gap-y-1 space-y-2">
    <View className="h-4 w-32 rounded animate-pulse bg-gray-700" ></View>
    <View className="flex-row items-center animate-pulse gap-x-1 space-x-2">
      <View className="h-4 w-20 rounded animate-pulse bg-gray-700" ></View>
      <View className="h-4 w-14 rounded animate-pulse bg-red-400 even:bg-green-700" ></View>
    </View>
    <View className="h-3 w-24 rounded animate-pulse bg-gray-700" ></View>
  </View>
);
export default AdminDashboard;
