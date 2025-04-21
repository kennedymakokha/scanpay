import { View, Text, Touchable, TouchableOpacity } from 'react-native';

interface StatsCardProps {
    title: string;
    value: string;
    action?: any
}

export function StatsCard({ title, value, action }: StatsCardProps) {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={action} className="bg-gray-100 dark:bg-gray-800 w-[48%] rounded-2xl p-4 mb-4 shadow">
            <Text className="text-gold-500 dark:text-gold-400">{title}</Text>
            <Text className="text-xl font-bold text-gray-900 dark:text-white mt-1">{value}</Text>
        </TouchableOpacity>
    );
}
