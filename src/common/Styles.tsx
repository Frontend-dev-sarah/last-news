import { Dimensions, StyleSheet } from 'react-native';
import Color from './Color';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imageWithAndHeight = (windowWidth - 40) / 2;
const customWidth = windowWidth / 3

const commonStyles = StyleSheet.create({
    theme: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 10
    },
    title: {
        fontWeight: 'bold',
        padding: 10
    },
    author: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },
    description: {
        fontSize: 18,
        padding: 10,
        color: Color.description,
        textAlign: 'justify'
    },
    content: {
        fontSize: 15,
        padding: 10,
        textAlign: 'justify',
        marginBottom: 10
    }
})

export { windowWidth, windowHeight, imageWithAndHeight, customWidth, commonStyles };