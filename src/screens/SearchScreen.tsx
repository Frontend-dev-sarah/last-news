import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, ListRenderItem } from 'react-native';
import Context from '../services/NewsContext';
import { SearchBar, ListItem } from 'react-native-elements';
import { Error } from '../components/Error';
import Color from '../common/Color';
import { NewsList } from '../types/NewsList';

type SearchScreenProps = {
    goToDetail: (item: NewsList) => void,
}

export const SearchScreen: React.FunctionComponent<SearchScreenProps> = ({
    goToDetail
}) => {
    const { fetchSearchResults, newsListData } = useContext(Context);
    const searchNewsList = newsListData.searchNewsList;
    const [search, setSearch] = useState('');
    let page = 1;
    const pageSize = 50;

    useEffect(() => {
        page === 1 && fetchSearchResults(search, pageSize, page)
    }, [])

    const nextNewsFetch = () => {
        page += 1;
        fetchSearchResults(search, pageSize, page)
    }

    const renderItem: ListRenderItem<NewsList> = ({ item }) => (
        <TouchableOpacity activeOpacity={0.6} onPress={() => goToDetail(item)}>
            <ListItem bottomDivider >
                <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </TouchableOpacity>
    );

    return (
        <View>
            <SearchBar
                placeholder='Type Here...'
                onChangeText={(search) => setSearch(search)}
                value={search}
                onSubmitEditing={() => fetchSearchResults(search)}
                returnKeyType="search"
                blurOnSubmit={true}
            />
            {newsListData.isFetchingSearch
                ? <ActivityIndicator size="large" color={Color.spin} />
                : newsListData.searchError
                    ? <Error message='Sorry, you have read too many articles from this app, please try to read in another 24h :)' />
                    : <FlatList
                        data={searchNewsList}
                        keyExtractor={(item) => item.title + Math.random()}
                        renderItem={renderItem}
                        onEndReachedThreshold={0.5}
                        onEndReached={nextNewsFetch}
                    />}
        </View>
    )
}