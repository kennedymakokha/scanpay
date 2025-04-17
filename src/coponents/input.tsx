import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
const Input = ({ placeholder, value, onChangeText, keyboard, label, hide, setHide }: { hide?: boolean, setHide?: any, placeholder: string, value: string | any, onChangeText: any, keyboard?: string | any, label?: string }) => {
    return (

        <View className="flex w-full  h-20  mb-4 rounded-md bg-black-100 justify-center">
            {label && <Text className='px-2  tracking-widest pt-2 uppercase text-gold-500 font-bold'>{label}</Text>}
            <View className="flex flex-row  items-center justify-between px-4">
                <TextInput
                    className=" rounded-xl text-gold-500"
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    secureTextEntry={hide}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboard}
                    autoCapitalize="none"
                />
                {hide !== undefined && <Icon onPress={setHide} name={hide ? "eye" : "eye-with-line"} size={30} color="#333333" />}
            </View>

        </View>


    )
}

export default Input