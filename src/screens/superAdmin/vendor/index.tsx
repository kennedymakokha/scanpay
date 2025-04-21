import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';



const users = [
  { name: 'Alice Johnson', role: 'Admin', active: true },
  { name: 'Bob Smith', role: 'User', active: false },
  { name: 'Charlie Ray', role: 'Manager', active: true },
];

export default function UserManagement() {

  const [activeUsers, setActiveUsers] = useState(users);

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black-50 px-4 py-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">Vendors</Text>

      </View>

      {/* User List */}
      {activeUsers.map((user, index) => (
        <View
          key={index}
          className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-3 flex-row justify-between items-center"
        >
          <View>
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <Text className="text-sm text-gray-500 dark:text-gray-400">Active</Text>
            <Switch
              value={user.active}
              onValueChange={(val) => {
                const updated = [...activeUsers];
                updated[index].active = val;
                setActiveUsers(updated);
              }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
