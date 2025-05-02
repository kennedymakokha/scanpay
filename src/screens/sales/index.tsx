import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'nativewind';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const kpis = [
    { icon: 'currency-usd', label: 'Total vendor value', value: '$12,430' },
    { icon: 'account-plus', label: 'New vendors', value: '27' },
    { icon: 'chart-line', label: 'Performance', value: '82%' },
];

const SalesDashboard = () => {
    const { colorScheme } = useColorScheme();

    return (
        <ScrollView className="flex-1 bg-white dark:bg-black-50 p-4">

            <View className="flex-row flex-wrap justify-between mb-6">
                {kpis.map((item, idx) => (
                    <View
                        key={idx}
                        className="w-[48%] bg-gray-100 dark:bg-[#1a1a1a] p-4 rounded-2xl mb-4 shadow"
                    >
                        <Icon
                            name={item.icon}
                            size={24}
                            color={colorScheme === 'dark' ? '#ffaa1d' : '#000'}
                            className="mb-2"
                        />
                        <Text className="text-gray-600 dark:text-gray-300">{item.label}</Text>
                        <Text className="text-xl font-semibold text-black dark:text-white">
                            {item.value}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Recent Activity */}
            <Text className="text-lg font-semibold text-black dark:text-white mb-2">Recent Deals</Text>
            <View className="bg-gray-100 dark:bg-[#1a1a1a] p-4 rounded-xl mb-4">
                <Text className="text-white font-medium">John Doe - $2,400</Text>
                <Text className="text-sm text-gray-400">Closed yesterday</Text>
            </View>
            <View className="bg-gray-100 dark:bg-[#1a1a1a] p-4 rounded-xl mb-4">
                <Text className="text-white font-medium">Jane Smith - $1,050</Text>
                <Text className="text-sm text-gray-400">Pending follow-up</Text>
            </View>

            {/* Actions */}
            <View className="flex-row justify-between mt-4">
                <TouchableOpacity className="bg-[#ffaa1d] p-3 rounded-xl w-[48%]">
                    <Text className="text-center font-semibold text-black">Add Lead</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-700 p-3 rounded-xl w-[48%]">
                    <Text className="text-center font-semibold text-white">View Reports</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SalesDashboard;
