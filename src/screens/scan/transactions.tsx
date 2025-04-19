import { View, Text, FlatList, StyleSheet, StatusBar, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ListItem from '../../coponents/listItem'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { ItemData, Transaction } from '../../../types'
import { authorizedFetch } from '../../utility/authorisedFetch'
import OverlayLoader from '../../coponents/Loader'


const TransactionPage = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Transaction[]>([])
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(async () => {
            const res = await authorizedFetch('http://185.113.249.137:5000/api/wallet/mpesa-logs');
            setData(res)
            setRefreshing(false);
        }, 1500);
    };

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true)
                const res = await authorizedFetch('http://185.113.249.137:5000/api/wallet/mpesa-logs');
                setData(res)
                setLoading(false)
                console.log(res)
            } catch (e) {
                setLoading(false)
                console.error(e);

            }
        };
        fetchLogs();
    }, []);
    if (loading) {
        return <OverlayLoader />
    }
    return (

        <View className="flex-1 bg-black-50 px-4 pt-[80px]">

            <FlatList
                data={data}
                keyExtractor={(item: any) => item._id}
                contentContainerStyle={{ paddingBottom: 30 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({ item }) => (
                    <View className="flex-row justify-between items-center bg-gray-800 rounded-xl px-4 py-3 mb-3">
                        <View>
                            <Text className="text-base font-semibold text-white">
                                {item.type !== 'Sent' ? `To ${item.party}` : `From ${item.party}`}
                            </Text>
                            <Text className="text-sm text-gray-400">{item.createdAt}</Text>
                        </View>
                        <View className="items-end">
                            <Text
                                className={`text-base font-bold ${item.amount < 0 ? 'text-red-400' : 'text-gold-400'
                                    }`}
                            >
                                Ksh {Math.abs(item.amount).toFixed(2)}
                            </Text>

                        </View>
                    </View>
                )}
            />
        </View>

    );
};



export default TransactionPage;
