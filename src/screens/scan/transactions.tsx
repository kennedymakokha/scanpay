import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import ListItem from '../../coponents/listItem'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { ItemData } from '../../../types'

const Transactions = () => {

    const DATA: ItemData[] = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={ListItem}
                    keyExtractor={item => item.id}
                // extraData={selectedId}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
export default Transactions