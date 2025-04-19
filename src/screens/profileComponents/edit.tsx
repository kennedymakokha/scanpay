import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    TextInput,
    Pressable,
} from 'react-native';

const EditModal = ({ setModalVisible, modalVisible }: any) => {

    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');

    const [editName, setEditName] = useState(name);
    const [editEmail, setEditEmail] = useState(email);

    const handleSave = () => {
        setName(editName);
        setEmail(editEmail);
        setModalVisible(false);
    };

    return (

        <Modal
            transparent
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-gray-900 w-11/12 rounded-2xl p-6">
                    <Text className="text-xl font-bold text-white mb-4 text-center">Edit Profile</Text>

                    <TextInput
                        value={editName}
                        onChangeText={setEditName}
                        placeholder="Name"
                        placeholderTextColor="#888"
                        className="border border-gray-700 text-white px-4 py-3 rounded-xl mb-4"
                    />
                    <TextInput
                        value={editEmail}
                        onChangeText={setEditEmail}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        className="border border-gray-700 text-white px-4 py-3 rounded-xl mb-4"
                    />

                    <Pressable className="bg-blue-600 py-3 rounded-xl items-center" onPress={handleSave}>
                        <Text className="text-white font-bold text-base">Save</Text>
                    </Pressable>
                    <Pressable className="mt-3 items-center" onPress={() => setModalVisible(false)}>
                        <Text className="text-gray-400">Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>

    );
};

const Section = ({ label, onPress }: { label: string; onPress?: () => void }) => (
    <TouchableOpacity className="py-3 border-b border-gray-800" onPress={onPress}>
        <Text className="text-white text-base">{label}</Text>
    </TouchableOpacity>
);

export default EditModal;
