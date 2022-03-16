import { ImageBackground, ImageSourcePropType, StyleSheet } from 'react-native';
import React from 'react';
import { windowWidth } from '../common/Styles';
import { Text } from 'react-native-elements';

interface NewsImageProps {
    newsImage: ImageSourcePropType,
    newsSource: string
}

export const NewsImage: React.FunctionComponent<NewsImageProps> = ({
    newsImage,
    newsSource
}) => {
    return (
        <ImageBackground source={newsImage} style={styles.image}>
            <Text style={styles.source}>From: {newsSource}</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        width: windowWidth,
        height: 200,
        resizeMode: 'cover'
    },
    source: {
        fontWeight: 'bold',
        fontSize: 18,
        textShadowColor: 'white',
        fontStyle: 'italic',
        textShadowOffset: ({ width: 2, height: 2 }),
        textShadowRadius: 2,
        position: 'absolute',
        bottom: 10,
        right: 10
    }
})