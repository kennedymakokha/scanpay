import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'

import { useColorScheme } from 'react-native';
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



type Props = {
  latlng?: string;
  keyboardType?: string|any;
  editable?: boolean;
  multiline?: boolean;
  value: string;
  onchange: (text: string) => void;
  placeholder: string;
};

export const InputContainer: React.FC<Props> = ({
  value,
  keyboardType,
  latlng,
  onchange,
  editable = true,
  multiline = false,
  placeholder,
}) => {
  const theme = useColorScheme(); // 'dark' or 'light'
  const isDark = theme === 'dark';

  const containerBg = latlng === 'yes' && !editable
    ? 'bg-slate-300 dark:bg-slate-700'
    : isDark
    ? 'bg-gray-800'
    : 'bg-primary-50';

  return (
    <View
      className={`flex w-full h-20 mb-4 rounded-lg justify-center ${containerBg}`}
    >
      <TextInput
        className={`px-4 py-3 text-lg font-bold text-base rounded-lg ${
          isDark ? 'text-gray-100' : 'text-gray-900'
        }`}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        value={value}
        onChangeText={onchange}
        editable={editable}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical="top"
      />
    </View>
  );
};



export default Input