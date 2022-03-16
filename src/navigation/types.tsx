import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';


export type RootStackParamList = {
    HomeTabs: NavigatorScreenParams<HomeTabParamList>;
    NewsDetail: { title: string, routeName: string };
    Search: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
    NewsList: undefined;
    ReadList: undefined;
    Setting: undefined;
};

export type HomeTabScreenProps = BottomTabScreenProps<HomeTabParamList>;