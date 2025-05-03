import React, { useCallback, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getDurationFromNow } from '../utility/formatDate';
import { useGetlogsQuery } from '../services/stkApi';

type Transaction = {
  id: string;
  type: 'Sent' | 'Received';
  amount: number;
  party: string;
  date: string;
};

const transactions: Transaction[] = [
  { id: '1', type: 'Sent', amount: -25.0, party: 'Alice', date: '2025-04-17' },
  { id: '2', type: 'Received', amount: 120.0, party: 'Stripe', date: '2025-04-16' },
  { id: '3', type: 'Sent', amount: -10.0, party: 'Bob', date: '2025-04-15' },
];

const UserDashboard = () => {
  
  const { user } = useSelector((state: any) => state.auth)
   const {
      data,
      isLoading,
      isSuccess,
      error,
      refetch,
      isFetching,
    } = useGetlogsQuery({ page: 1, limit : 3 });
  const renderItem = useCallback(({ item }: any) => (
    <View className="bg-gray-800 p-4 gap-y-2 rounded-lg mb-2">
      <View className="flex items-center flex-row justify-between">
        <Text className="font-semibold text-white">
          {`+254*******${item.phone_number.slice(-3)}`}
        </Text>
        <Text className="text-white">{`Ksh ${item.amount.toFixed(2)} `}</Text>
      </View>

      <View className="flex-row">

        <Text
          className={`${item.ResponseCode === 0 ? 'text-green-400' : 'text-red-400'
            } max-w-[250px] text-wrap`}
        >
          {item.ResultDesc}
        </Text>
      </View>
      <Text className="text-gray-400 self-end text-end text-sm">
        {getDurationFromNow(item.createdAt) || ''}
      </Text>
    </View>
  ), []);
  return (
    <View className="flex-1 bg-black-50 px-4 ">
      <View className="flex-row items-center mb-6">
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          className="w-20 h-20 rounded-md mr-4"
        />
        <View>
          <Text className="text-lg font-bold text-white">{user.username}</Text>
          <Text className="text-sm text-gray-400">{user.phone_number}</Text>
        </View>
      </View>
      <Text className="text-xl font-semibold text-white mb-3">
        Recent Transactions
      </Text>
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
export default UserDashboard;
