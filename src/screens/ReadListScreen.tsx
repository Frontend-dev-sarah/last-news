import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../services/ReadListContext';
import { NewsCard } from '../components/NewsCard';
import { Error } from '../components/Error';
import { commonStyles } from '../common/Styles';
import { RootStackParamList } from '../navigation/types';
import { NewsList } from '../types/NewsList';

type ReadListScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeTabs'>

export const ReadListScreen: React.FunctionComponent<ReadListScreenProps> = ({ navigation }: ReadListScreenProps) => {
    const { readListData } = useContext(Context);


    const getReadingList = async () => {
        try {
            const jsonreadListData = await AsyncStorage.getItem('read_list')
            return jsonreadListData != null ? JSON.parse(jsonreadListData) : null;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getReadingList()
    }, [])

    const renderItem: ListRenderItem<NewsList> = ({ item }) => (
        <NewsCard
            newsItem={item}
            newsTitle={item.title}
            newsAuthor={item.author}
            newsSource={item.source.name}
            newsUrl={item.url}
            newsImage={item.urlToImage}
            publishedAt={item.publishedAt}
            message='Sorry, the source is not valid.'
            goToDetail={() => navigation.navigate('NewsDetail', { title: item.title, routeName: 'readlist' })}
        />
    );

    return (
        <View style={commonStyles.theme}>
            {readListData.readList.length === 0 ? <Error message="Your readlist is empty" /> :
                <FlatList
                    data={readListData.readList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.title}

                />}

        </View>
    )
}