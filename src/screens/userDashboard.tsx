import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

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
  const [balance] = useState(150.25);
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
  };

  return (
    <View className="flex-1 bg-black-50 px-4 pt-[80px]">
      {/* User Info */}
      <View className="flex-row items-center mb-6">
        <Image
          source={{ uri: user.avatar }}
          className="w-20 h-20 rounded-md mr-4"
        />
        <View>
          <Text className="text-lg font-bold text-white">{user.name}</Text>
          <Text className="text-sm text-gray-400">{user.email}</Text>
        </View>
      </View>

      {/* Wallet Summary */}
      <View className="bg-gray-800 rounded-xl p-4 mb-6">
        <Text className="text-gray-300">Wallet Balance</Text>
        <Text className="text-3xl font-bold text-green-400 mt-1">
          ${balance.toFixed(2)}
        </Text>
      </View>


      {/* Recent Transactions */}
      <Text className="text-xl font-semibold text-white mb-3">
        Recent Transactions
      </Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-gray-800 rounded-xl px-4 py-3 mb-2">
            <View>
              <Text className="font-medium text-white">
                {item.type === 'Sent' ? `To ${item.party}` : `From ${item.party}`}
              </Text>
              <Text className="text-xs text-gray-400">{item.date}</Text>
            </View>
            <Text
              className={`font-bold ${item.amount < 0 ? 'text-red-400' : 'text-green-400'
                }`}
            >
              {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount).toFixed(2)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default UserDashboard;
