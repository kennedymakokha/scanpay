import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import EditModal from './profileComponents/edit';

const ProfileScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        joined: 'January 2023',
        avatar: 'https://i.pravatar.cc/150?img=12', // Placeholder avatar
    };

    return (
        <ScrollView className="flex-1 bg-black-50 px-5 pt-[80px]">
            <View className="items-center mt-8 mb-6">
                <Image
                    source={{ uri: user.avatar }}
                    className="w-28 h-28 rounded-full mb-4"
                />
                <Text className="text-white text-2xl font-bold">{user.name}</Text>
                <Text className="text-gray-400 text-sm">{user.email}</Text>
                <Text className="text-gray-500 text-xs mt-1">Joined {user.joined}</Text>
            </View>

            <View className="bg-gray-900 rounded-2xl p-4 space-y-4">
                <Section setModalVisible={setModalVisible} label="Edit Profile" />
                <Section label="Security Settings" />
                <Section label="Transaction History" />
                <Section label="Notifications" />
                <Section label="Help & Support" />
            </View>
            <EditModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
            <TouchableOpacity className="mt-6 bg-gold-500 py-3 rounded-xl items-center">
                <Text className="text-black-300 font-bold text-base">Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const Section = ({ label, setModalVisible }: { label: string, setModalVisible?: any }) => (
    <TouchableOpacity activeOpacity={1} onPress={() => setModalVisible(true)} className="py-3 border-b border-gray-800">
        <Text className="text-white text-base">{label}</Text>
    </TouchableOpacity>
);

export default ProfileScreen;
