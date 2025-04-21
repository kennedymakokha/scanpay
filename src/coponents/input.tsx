import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'

import { useColorScheme } from 'react-native';
import { InputProps } from '../../types';



export const Input: React.FC<InputProps> = ({
  value,
  keyboardType,
  latlng,
  onChangeText,
  editable = true,
  multiline = false,
  placeholder,
  label, hide, setHide
}) => {
  const theme = useColorScheme(); // 'dark' or 'light'
  const isDark = theme === 'dark';

  const containerBg = latlng === 'yes' && !editable
    ? 'bg-slate-300 dark:bg-slate-700'
    : isDark
      ? 'bg-gray-800'
      : 'bg-primary-50';

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
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
        {hide !== undefined && <Icon onPress={setHide} name={hide ? "eye" : "eye-with-line"} size={30} color="#333333" />}
      </View>

    </View>

  );
};



export const InputContainer: React.FC<InputProps> = ({
  value,
  keyboardType,
  latlng,
  onChangeText,
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
        className={`px-4 py-3 text-lg font-bold text-base rounded-lg ${isDark ? 'text-gray-100' : 'text-gray-900'
          }`}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical="top"
      />
    </View>
  );
};



export default Input