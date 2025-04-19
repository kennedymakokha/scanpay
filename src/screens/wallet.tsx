import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';

type Transaction = {
  id: string;
  type: 'Sent' | 'Received';
  amount: number;
  to?: string;
  from?: string;
  date: string;
};

const transactions: Transaction[] = [
  { id: '1', type: 'Sent', amount: -25.0, to: 'Alice', date: '2025-04-15' },
  { id: '2', type: 'Received', amount: 50.0, from: 'Bob', date: '2025-04-14' },
  { id: '3', type: 'Sent', amount: -10.0, to: 'Charlie', date: '2025-04-13' },
];

const WalletView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const balance = 115.25;

  const handleWithdraw = () => {
    console.log('Withdraw:', withdrawAmount);
    setModalVisible(false);
    setWithdrawAmount('');
  };

  return (
    <View className="flex-1 bg-black-50 px-5 pt-[80px]">

      <Text className="text-4xl font-semibold text-blue-400 my-6">
        Ksh {balance.toFixed(2)}
      </Text>

      <View className="flex-row space-x-3 mb-6">

        <TouchableOpacity
          className="flex-1 bg-gold-500 py-3 rounded-xl items-center"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-black-300 font-bold text-base">Withdraw</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-xl font-medium mb-3 text-white">Recent Transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-800 p-4 rounded-xl mb-3 flex-row justify-between shadow-sm">
            <Text className="text-white text-base">
              {item.type === 'Sent' ? `Sent to ${item.to}` : `Received from ${item.from}`}
            </Text>
            <Text
              className={`text-base font-bold ${item.amount < 0 ? 'text-red-400' : 'text-green-400'
                }`}
            >
              Ksh {Math.abs(item.amount).toFixed(2)}
            </Text>
          </View>
        )}
      />

      {/* Withdraw Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-gray-900 w-11/12 rounded-2xl p-6">
            <Text className="text-xl font-semibold mb-4 text-white text-center">
              Withdraw Funds
            </Text>
            <TextInput
              className="border border-gray-600 rounded-xl px-4 py-3 mb-4 text-base text-white"
              placeholder="Enter amount"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
            />
            <Pressable
              className="bg-gold-500 py-3 rounded-xl items-center"
              onPress={handleWithdraw}
            >
              <Text className="text-black-300 font-bold text-base">
                Confirm Withdraw
              </Text>
            </Pressable>
            <Pressable
              className="mt-3 items-center"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-gray-400">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WalletView;
