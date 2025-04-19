import React from 'react';
import { View, Text, ScrollView } from 'react-native';


const AdminDashboard = () => {
  return (
    <ScrollView className="flex-1 bg-black-50 px-4 pt-[80px]">

      <View className="flex-row flex-wrap justify-between">
        <StatCard title="Total Payments" value="Ksh 10,500" color="bg-green-600" />
        <StatCard title="Cash Received" value="Ksh 4,300" color="bg-blue-600" />
        <StatCard title="Pending" value="3" color="bg-yellow-500" />
        <StatCard title="Users" value="205" color="bg-purple-600" />
      </View>

      {/* Recent Transactions */}
      <Text className="text-lg font-semibold text-white mt-6 mb-2">Recent Transactions</Text>

      <View className="bg-gray-800 p-4 rounded-lg mb-2">
        <Text className="font-semibold text-white">John Doe</Text>
        <Text className="text-white">
          $100 - <Text className="text-green-400">Success</Text>
        </Text>
        <Text className="text-gray-400 text-sm">2025-04-14 14:32</Text>
      </View>

      <View className="bg-gray-800 p-4 rounded-lg">
        <Text className="font-semibold text-white">Jane Smith</Text>
        <Text className="text-white">
          $50 - <Text className="text-yellow-400">Pending</Text>
        </Text>
        <Text className="text-gray-400 text-sm">2025-04-14 13:10</Text>
      </View>
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
