import React from 'react';
import {
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Text } from 'react-native-elements';
import { windowWidth } from '../common/Styles';
import Color from '../common/Color';

interface ButtonProps {
    buttonText: string,
    onPress: ()=> void;
}

export const Button: React.FunctionComponent<ButtonProps> = ({ buttonText, onPress}) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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