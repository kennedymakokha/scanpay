import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose FontAwesome, Ionicons, etc.

const CustomCheckbox = ({ checked, setChecked, title }: { title: string, checked: boolean, setChecked: any }) => {


    return (
        <TouchableOpacity
            className='flex flex-row items-center m-2 mb-4'
            onPress={() => setChecked(!checked)}
        >
            <Icon
                name={checked ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color={checked ? '#d4af37' : '#555'}
            />
            <Text className='text-gold-300' >{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    },
    label: {
        marginLeft: 8,
        fontSize: 16,
    },
});

export default CustomCheckbox;
