import { StyleSheet, View, TouchableOpacity, Alert, Linking } from 'react-native';
import React, { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { commonStyles } from '../common/Styles';
import { NewsImage } from './NewsImage';
import { Text } from 'react-native-elements';
import { ReadListIcon } from './ReadListIcon';
import { NewsList } from '../types/NewsList';

interface NewsCardProps {
    newsItem: NewsList,
    newsTitle: string,
    newsAuthor: string,
    newsSource: string,
    newsUrl: string,
    newsImage: string,
    publishedAt: string,
    goToDetail: () => void,
    message: string
}

export const NewsCard: React.FunctionComponent<NewsCardProps> = ({
    newsItem,
    newsTitle,
    newsAuthor,
    newsSource,
    newsUrl,
    newsImage,
    publishedAt,
    goToDetail,
    message
}) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapse = () => {
        //Toggling the state of  Collapsible
        setCollapsed(!collapsed);
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => goToDetail()}>
                {/*`NewsImage` and `newsSource` shown by using with ImageBackground*/}
                <NewsImage
                    newsImage={{ uri: newsImage }}
                    newsSource={newsSource}
                />
                <Text style={commonStyles.title} h4>{newsTitle}</Text>
                <Text style={styles.date}>{publishedAt}</Text>
            </TouchableOpacity>
            {/*Code for toggling collapsible button*/}
            <TouchableOpacity style={styles.collapsedHeader} onPress={toggleCollapse}>
                {collapsed
                    ? <MaterialCommunityIcons name="chevron-down-circle" size={30} color="black" />
                    : <MaterialCommunityIcons name="chevron-up-circle" size={30} color="black" />}
                {/* <Text style={styles.collapsedHeader}>{collapsed ? <Icon name = 'caret-down/>: 'Less'}</Text> */}
            </TouchableOpacity>
            {/*Code for `Author``NewsUrl` Collapsible Start*/}
            <Collapsible style={styles.collapsedContent} collapsed={collapsed}>
                <Text>Author: {newsAuthor}</Text>

                <TouchableOpacity
                    style={styles.source}
                    onPress={async () => newsUrl
                        ? await Linking.openURL(newsUrl)
                        : await Alert.alert(message)}>
                    <Text style={{ textDecorationLine: 'underline', fontStyle: 'italic', marginVertical: 10 }}>{`Source Link: ${newsSource}`}</Text>
                </TouchableOpacity>
                <ReadListIcon newsItem={newsItem} />
            </Collapsible>
            {/*Code for `Author``NewsUrl` Collapsible Ends*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    source: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    date: {
        textAlign: 'right',
        paddingRight: 10
    },
    collapsedHeader: {
        paddingRight: 10,
        paddingTop: 5,
        alignItems: 'flex-end'
    },
    collapsedContent: {
        paddingLeft: 10
    }
})