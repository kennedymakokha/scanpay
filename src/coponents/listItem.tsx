import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { ItemData } from '../../types'

const ListItem = ({ item }: { item: ItemData | any }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [isPressed, setIsPressed] = useState(false);


    return (
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)}
            activeOpacity={0.9}
            className={`w-full flex-row ${item.ResponseCode !== 0 && "text-red-400"} bg-black-100 p-4 border-t border-t-[0.2px] shadow-2xl`}>
            <View className='flex-row'>
                <View className='flex border-r  min-w-10'>
                    <Text className='text-slate-500 font-bold text-[17px] '>Ksh {item.amount} </Text>
                </View>
                <View className='flex border-r  min-w-10'>
                    <Text className='text-slate-500 font-bold text-[17px] '> {item.MpesaReceiptNumber}</Text>
                </View>
            </View>

            {isPressed && (<Text className='text-slate-500 font-bold text-[17px] '> {item.ResultDesc}</Text>)}
        </TouchableOpacity>
    )
}

export default ListItem