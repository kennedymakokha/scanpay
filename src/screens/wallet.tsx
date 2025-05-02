import React, { useCallback, useEffect, useState } from 'react';
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
import { FormatDate, getDurationFromNow } from '../utility/formatDate';
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


  const renderItem = useCallback(({ item }: any) => (
    <View className="bg-gray-800 p-4 gap-y-2 rounded-lg mb-2">
      <View className="flex items-center flex-row justify-between">
        <Text className="font-semibold text-white">
          {`+${item.phone_number}`}
        </Text>
        <Text className="text-white">{`Ksh ${item.amount.toFixed(2)} `}</Text>
      </View>

      <View className="flex-row">

        <Text
          className={`${item.ResponseCode === 0 ? 'text-green-400' : 'text-red-400'
            } max-w-[250px] text-wrap`}
        >
          {item.ResultDesc}
        </Text>
      </View>
      <Text className="text-gray-400 self-end text-end text-sm">
        {getDurationFromNow(item.createdAt) || ''}
      </Text>
    </View>
  ), []);

  return (
    <View className="flex-1 bg-black-50 px-5 ">
      {balance !== undefined && balanceSuccess && !balanceLoading ? <Text className="text-4xl text-center mb-4 font-semibold text-blue-400 ">
        Ksh {balance?.amount.toFixed(2)}
      </Text> :
        <View className="bg-gray-800 self-center animate-pulse p-1 h-20 w-[200px] rounded-xl mb-3 flex-row justify-between items-center shadow-sm">

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
  <View className="bg-gray-800 animate-pulse p-4 gap-y-3 rounded-lg mb-2 gap-y-1 space-y-2">
    <View className="h-4 w-32 rounded animate-pulse bg-gray-700" ></View>
    <View className="flex-row items-center animate-pulse gap-x-1 space-x-2">
      <View className="h-4 w-20 rounded animate-pulse bg-gray-700" ></View>
      <View className="h-4 w-14 rounded animate-pulse bg-red-400 even:bg-green-700" ></View>
    </View>
    <View className="h-3 w-24 rounded animate-pulse bg-gray-700" ></View>
  </View>
);

export default WalletView;
