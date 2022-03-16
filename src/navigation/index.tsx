import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NewsListScreen } from '../screens/NewsListScreen';
import { NewsDetailScreen } from '../screens/NewsDetailScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ReadListScreen } from '../screens/ReadListScreen';
import { SettingScreen } from '../screens/SettingScreen';
import Color from '../common/Color';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, HomeTabParamList } from './types';


const index = () => {
    const Stacks = createNativeStackNavigator<RootStackParamList>();
    const Tabs = createBottomTabNavigator<HomeTabParamList>();

    const HomeTabs = () => {
        return (
            <Tabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'NewsList') {
                            iconName = 'newspaper'
                        } else if (route.name === 'ReadList') {
                            iconName = 'ios-book';
                        } else if (route.name === 'Setting') {
                            iconName = 'md-settings';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: Color.tintColor,
                    tabBarInactiveTintColor: Color.inactiveColor,
                    tabBarStyle: { paddingBottom: 5 }

                })}
            >
                <Tabs.Screen name='NewsList' options={{ headerShown: false }} component={NewsListScreen} />
                <Tabs.Screen name='ReadList' component={ReadListScreen} />
                <Tabs.Screen name='Setting' component={SettingScreen} />
            </Tabs.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stacks.Navigator >
                <Stacks.Screen
                    name='HomeTabs'
                    component={HomeTabs}
                    options={{ headerShown: false }}
                />
                <Stacks.Screen name='NewsDetail'
                    component={NewsDetailScreen}
                    options={() => ({
                        headerTitle: '',
                        // headerStyle: {
                        //   backgroundColor: Color.tintColor
                        // },
                        headerTintColor: Color.tintColor,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        animation: 'flip'
                    })
                    }
                />
                <Stacks.Screen name='Search'
                    component={SearchScreen}
                    options={{ headerShown: false }}
                />
            </Stacks.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

export default index;