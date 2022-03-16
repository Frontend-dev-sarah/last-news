import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Context, { ReadProviderProps } from '../services/ReadListContext';
import { Ionicons } from '@expo/vector-icons';
import Color from '../common/Color';
import { NewsList } from '../types/NewsList';

interface ReadListIconProps {
    newsItem: NewsList
}

export const ReadListIcon: React.FunctionComponent<ReadListIconProps> = ({ newsItem }) => {
    const { pressReadListIcon, readListData } = useContext(Context) as ReadProviderProps;


    const isInReadList = readListData.readList.some((read: NewsList) => read && read.title === newsItem.title)

    return (
        <TouchableOpacity style={styles.readIconContainer}
            onPress={() => pressReadListIcon(newsItem)}>
            <Ionicons style={{ marginRight: 15 }} name='ios-book' color={isInReadList ? Color.tintColor : Color.inactiveColor} size={30} />
            <Text>Read List</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    readIconContainer: {
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
})