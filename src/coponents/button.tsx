import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ handleLogin, title }: { handleLogin: any, title: any }) => {
    return (
        <TouchableOpacity activeOpacity={1}
            className="bg-gold-500 py-3 rounded-xl"
            onPress={handleLogin}
        >
            <Text className="text-center tracking-widest uppercase font-bold text-black-50 font-semibold text-lg">
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button