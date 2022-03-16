import React, { useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import Context from '../services/NewsContext';
import ReadListContext from '../services/ReadListContext';
import { Text, Input, Divider } from 'react-native-elements';
import { commonStyles, windowWidth } from '../common/Styles';
import { NewsImage } from '../components/NewsImage';
import Color from '../common/Color';
import { Button } from '../components/Button';
import { RootStackParamList } from '../navigation/types';
import type { RouteProp } from '@react-navigation/native';
import { NewsList } from '../types/NewsList';


type NewsDetailRouteProps = RouteProp<RootStackParamList, 'NewsDetail'>;


export const NewsDetailScreen: React.FunctionComponent<NewsDetailRouteProps> = () => {
    const { params } = useRoute<NewsDetailRouteProps>();
    const { newsList, searchNewsList } = useContext(Context).newsListData;
    const { readListData } = useContext(ReadListContext);

    const newsLists = newsList && newsList.newsList;
    const readList = readListData.readList;

    const news = params.routeName === 'list'
        ? newsLists.find((news: NewsList) => news.title === params.title)
        : params.routeName === 'readlist'
            ? readList.find((news: NewsList) => news.title === params.title)
            : searchNewsList.find((news) => news.title === params.title);

    return (
        <ScrollView style={commonStyles.theme}>
            <Text h4 style={styles.title}>{news.title}</Text>
            <NewsImage
                newsImage={{ uri: news.urlToImage }}
                newsSource={news.source.name}
            />
            <Text style={commonStyles.description}>{news.description}</Text>
            <Text style={commonStyles.content}>{news.content}</Text>
            <Text style={styles.comment}>Thanks for your reading !</Text>
            <Divider inset={true} insetType="middle" width={1} style={{ marginVertical: 5 }} />
            <Text style={styles.comment}>Leave a comment ?</Text>

            {/*will developer with COMMENT PART post API, but not possible with `newsapi.org`*/}
            <Input
                containerStyle={styles.inputContainer}
                multiline={true}
                inputContainerStyle={{ borderBottomWidth: 0, padding: 0 }}
            />
            <Button buttonText='Submit' onPress={() => Alert.alert('Thanks for your comments !')} />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    title: {
        padding: 10,
        marginTop: 10
    },
    inputContainer: {
        margin: 10,
        borderWidth: 1,
        borderColor: Color.primary,
        borderRadius: 10,
        width: windowWidth - 20
    },
    comment: {
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        backgroundColor: Color.primaryLight,
        width: windowWidth - 20,
        alignSelf: 'center',
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        padding: 10,
        color: 'white',
        fontSize: 15
    }
})