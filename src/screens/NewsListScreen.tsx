import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, ListRenderItem, RefreshControl, ActivityIndicator } from 'react-native';
import Context from '../services/NewsContext';
import Color from '../common/Color';
import { NewsCard } from '../components/NewsCard';
import { commonStyles } from '../common/Styles';
import { Images } from '../common/Images';
import { Tab, TabView } from 'react-native-elements';
import { CategoryList } from '../components/CategoryList';
import { SearchScreen } from './SearchScreen';
import { Error } from '../components/Error';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Category } from '../types/Category';
import { NewsList } from '../types/NewsList';

type NewsListScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeTabs'>;

export const NewsListScreen: React.FunctionComponent<NewsListScreenProps> = ({ navigation }: NewsListScreenProps) => {
    const categories: Category[] = [
        { name: 'business', image: Images.business },
        { name: 'entertainment', image: Images.entertainment },
        { name: 'general', image: Images.general },
        { name: 'health', image: Images.health },
        { name: 'science', image: Images.science },
        { name: 'sports', image: Images.sports },
        { name: 'technology', image: Images.technology },

    ]

    const { newsListData, fetchNewsList } = useContext(Context);
    const newsList = newsListData.newsList && newsListData.newsList.newsList;
    const [category, setCategory] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchNewsList(category);
    }, [category])


    const onPressCategory = (category: Category) => {
        fetchNewsList(category.name);
        setCategory(category.name);
    }

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
            goToDetail={() => navigation.navigate('NewsDetail', { title: item.title, routeName: 'list' })}
        />
    );

    const renderContent = () => {
        return <View style={commonStyles.theme}>
            <Tab
                value={index}
                onChange={(e) => { setIndex(e), fetchNewsList(category) }}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 2
                }}
                variant='primary'
                containerStyle={{ backgroundColor: 'white' }}
            >
                <Tab.Item
                    title='Top'
                    titleStyle={{ fontSize: 15, marginTop: 20 }}
                />
                <Tab.Item
                    title='News'
                    titleStyle={{ fontSize: 15, marginTop: 20 }}
                />
                <Tab.Item
                    icon={{ name: 'search', type: 'ionicon', color: 'white', marginTop: 30, marginBottom: 0, }}
                />
            </Tab>
            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%' }}>
                    {newsListData.isFetchingList
                        ? <ActivityIndicator size="large" color={Color.spin} />
                        : newsListData.error
                            ? <Error message='Sorry, you have read too many articles from this app, please try to read in another 24h :)' />
                            : <FlatList
                                data={newsList}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.title}
                            />}

                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <View>
                        <CategoryList
                            categories={categories}
                            onPressCategory={(category) => onPressCategory(category)}
                        />
                        {newsListData.isFetchingList
                            ? <ActivityIndicator size="large" color={Color.spin} />
                            : newsListData.error
                                ? <Error message='Sorry, you have read too many articles from this app, please try to read in another 24h :)' />
                                : <FlatList
                                    data={newsList}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.title}
                                    extraData={category}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={false}
                                            onRefresh={() => fetchNewsList(category)}
                                        />
                                    }
                                />
                        }

                    </View>
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <SearchScreen
                        goToDetail={(item: NewsList) => navigation.navigate('NewsDetail', { title: item.title, routeName: 'search' })} />
                </TabView.Item>
            </TabView>
        </View>
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {renderContent()}
        </View>
    )
}


