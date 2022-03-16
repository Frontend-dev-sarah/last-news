import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { windowHeight } from '../common/Styles';


interface ErrorProps {
    message: string
}

export const Error: React.FunctionComponent<ErrorProps> = ({
    message
}) => {
    return (
        <Card containerStyle={styles.container}>
            <Card.Title>{message}</Card.Title>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: windowHeight / 4
    }
})