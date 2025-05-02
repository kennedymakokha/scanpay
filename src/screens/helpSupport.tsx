import React from 'react';
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'nativewind';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HelpSupportScreen = () => {
    const { colorScheme } = useColorScheme();
    const openMail = () => {
        Linking.openURL('mailto:support@scanpay.org');
    };
    const openFAQ = () => {
        Linking.openURL('https://scanpay.org/faq');
    };

    return (
        <View className="flex-1 bg-white dark:bg-black-50 justify-center p-4">
            <Text className="text-2xl font-bold text-black dark:text-white mb-4">
                Help & Support
            </Text>

            <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Frequently Asked Questions
                </Text>
                <TouchableOpacity onPress={openFAQ} className="flex-row items-center space-x-2">
                    <Icon name="file-document-outline" size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                    <Text className="text-blue-500">View our FAQ page</Text>
                </TouchableOpacity>
            </View>

            <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Contact Support
                </Text>
                <TouchableOpacity onPress={openMail} className="flex-row items-center space-x-2">
                    <Icon name="email-outline" size={20} color={colorScheme === 'dark' ? '#fff' : '#000'} />
                    <Text className="text-blue-500">support@example.com</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text className="text-base text-gray-600 dark:text-gray-400">
                    We’re here to help. Reach out if you have any questions or need assistance with your account.
                </Text>
            </View>
        </View>
    );
};

export default HelpSupportScreen;
