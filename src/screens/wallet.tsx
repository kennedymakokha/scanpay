import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useGetbalanceQuery, useGetlogsQuery } from '../services/stkApi';
import { useSocket } from '../../contexts/SocketContext';
import { FormatDate } from '../utility/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from '../features/auth/balance/balanceSlice';

type Transaction = {
  id: string;
  type: 'Sent' | 'Received';
  amount: number;
  to?: string;
  from?: string;
  date: string;
};

const WalletView = () => {
  const { socket } = useSocket();
  const [modalVisible, setModalVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paying, setPaying] = useState(false);

  const { data: balance, isLoading: balanceLoading, isSuccess: balanceSuccess, refetch: refetchBalance } = useGetbalanceQuery({});
  const { data, isLoading, isSuccess, error, refetch } = useGetlogsQuery({ page: 1, limit: paying ? 6 : 6 });

  const dispatch = useDispatch();
  useEffect(() => {
    if (balanceSuccess && balance) {
      dispatch(
        setBalance({
          amount: balance.amount,
          updatedAt: balance.timestamp,  // adjust to your API shape
        })
      );
    }
  }, [balanceSuccess, balance, dispatch]);
  useEffect(() => {
    const handlePaymentStart = (data: any) => setPaying(data);
    socket?.on("payment-start", handlePaymentStart);

    return () => {
      socket?.off("payment-start", handlePaymentStart); // Cleanup on unmount
    };
  }, [socket]);

  useEffect(() => {
    const handlePaymentEnd = async (data: any) => {
      await refetch();
      await refetchBalance()

      setPaying(false);
    };
    socket?.on("payment-end", handlePaymentEnd);

    return () => {
      socket?.off("payment-end", handlePaymentEnd); // Cleanup on unmount
    };
  }, [socket, refetch]);

  useEffect(() => {
    const handlePaymentUpdated: any = (data: any) => {
      // Handle payment updated event
    };
    socket?.on("payment-updated", handlePaymentUpdated);

    return () => {
      socket?.off("payment-updated", handlePaymentUpdated); // Cleanup on unmount
    };
  }, [socket]);

  const handleWithdraw = () => {
    console.log('Withdraw:', withdrawAmount); // You can remove this log in production
    setModalVisible(false);
    setWithdrawAmount('');
  };

  const renderItem = ({ item }: any) => (
    <View className="bg-gray-800 p-4 rounded-xl mb-3 flex-row justify-between shadow-sm">
      <Text className="text-gold-500 text-base">
        {item?.type === 'Sent' ? `Sent to ${item?.vendor}` : ` Ksh ${item?.amount}  ${item?.phone_number} `}
      </Text>
      <Text className={`text-base font-bold ${item?.ResponseCode !== 0 ? 'text-red-400' : 'text-green-400'}`}>
        {FormatDate(item?.createdAt) || ''}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-black-50 px-5 pt-14">
      {balance !== undefined && balanceSuccess && !balanceLoading ? <Text className="text-4xl font-semibold text-blue-400 ">
        Ksh {balance?.amount.toFixed(2)}
      </Text> :
        <View className="bg-gray-800 animate-pulse p-4 h-20 w-[100px] rounded-xl mb-3 flex-row justify-between items-center shadow-sm">
        </View>
      }
      <View className="flex-row space-x-3 mb-6">
        <TouchableOpacity
          className="flex-1 bg-gold-500 py-3 rounded-xl items-center"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-black-300 font-bold text-base">Withdraw</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-xl font-medium mb-3 text-white">Recent Transactions</Text>
      {paying && <ActivityIndicator color="red" />}
      <FlatList
        data={isLoading ? [...Array(10)] : data?.logs}
        keyExtractor={(item, index) => isLoading ? index.toString() : item?._id}
        renderItem={isLoading ? LoaderCard : renderItem}
        refreshControl={
          <RefreshControl refreshing={isLoading && isSuccess && data !== undefined} onRefresh={refetch} />
        }
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

const LoaderCard = () => (
  <View className="bg-gray-800 animate-pulse p-4 rounded-xl mb-3 flex-row justify-between items-center shadow-sm">
    <View className="bg-gray-700 h-4 w-32 rounded-md animate-pulse" />
    <View className="bg-gray-700 h-4 w-20 rounded-md animate-pulse" />
  </View>
);

export default WalletView;
