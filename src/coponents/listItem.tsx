import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ItemData } from '../../types'

const ListItem = ({ item }: { item: ItemData }) => {

    return (
        <TouchableOpacity activeOpacity={1} className='w-full p-2 border border-[0.2px] shadow-2xl'>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    )
}

export default ListItem