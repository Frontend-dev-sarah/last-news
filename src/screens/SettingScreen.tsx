import React, { useEffect, useState, useRef } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { ListItem, Card, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../common/Color';
import * as Notifications from 'expo-notifications';
import registerNotifications from '../services/PushNotifications';
import { windowHeight } from '../common/Styles';

interface SettingScreenProps {
    isEnabled: boolean,
    expoPushToken: string,

}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export const SettingScreen: React.FunctionComponent<SettingScreenProps> = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    //using switch button as a tool to send notification content, of course, it's just a demo 
    const toggleSwitch = async () => {
        setIsEnabled(previousState => !previousState),
            !isEnabled && await schedulePushNotification()
    };

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    useEffect(() => {
        registerNotifications().then(token => setExpoPushToken(token)).catch(err => console.log(err));
        // AsyncStorage.setItem('push_token', expoPushToken);
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const schedulePushNotification = async () => {

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Russia VS Ukraine!",
                body: 'President as Everyman: Zelensky’s mastery of the direct appeal',
                data: { data: 'President as Everyman: Zelensky’s mastery of the direct appeal' },
            },
            trigger: { seconds: 2 },
        });
    }

    return (
        <View>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Notification</ListItem.Title>
                </ListItem.Content>
                <Switch
                    trackColor={{ false: Color.inactiveColor, true: Color.tintColor }}
                    thumbColor={isEnabled && Color.tintColor}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </ListItem>
            {isEnabled &&
                <Card containerStyle={styles.container}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text h4>{notification && notification.request.content.title} </Text>
                        <Text>{notification && notification.request.content.body}</Text>
                        <Text>{notification && JSON.stringify(notification.request.content.data.data)}</Text>
                    </View>

                </Card>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: windowHeight / 4
    }
})