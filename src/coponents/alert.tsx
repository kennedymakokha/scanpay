import { View, Text } from 'react-native'
import React from 'react'

const AlertContainer: any = ({ msg, state }: any) => {
    return (
        <View className="flex px-4">
            <View className={`${state === "error" ? "bg-red-500" : "bg-green-400"} p-2  w-full rounded-md mb-4`}>
                <Text className="text-white uppercase text-center">{msg}</Text>
            </View>
            </View>
            )
        
       
}

export default AlertContainer