import React, { useReducer, FunctionComponent } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsList } from '../types/NewsList';

enum types {
    ADD_READITEM = 'ADD_READITEM',
    REMOVE_READITEM = 'REMOVE_READITEM'
}
const initialState = {
    readList: [],
    readItem: {
        author: '',
        content: '',
        description: '',
        publishedAt: '',
        source: {},
        title: '',
        url: '',
        urlToImage: ''
    }
}

interface ReadListState {
    readList: NewsList[],
    readItem: NewsList
}

interface ReadListAction {
    type: types,
    payload?: any
}

export interface ReadProviderProps {
    readListData: ReadListState,
    pressReadListIcon: (item: NewsList) => void,
    addToReadList: (item: NewsList) => void,
    removeFromReadList: (item: NewsList) => void
}

const Context = React.createContext<ReadProviderProps | null>(null);



const readReducer = (state: ReadListState, action: ReadListAction) => {
    switch (action.type) {
        case 'ADD_READITEM':
            return {
                ...state,
                readItem: action.payload,
                readList: [...state.readList, action.payload]
            }
        case 'REMOVE_READITEM':
            return {
                ...state,
                readItem: action.payload,
                readList: state.readList.filter((item) => item.title !== action.payload.title)
            }
        default:
            return state;
    }
}


export const ReadProvider: FunctionComponent = ({ children }) => {

    const [state, dispatch] = useReducer(readReducer, initialState);

    const storeReadingList = async (readListData: NewsList) => {
        try {
            //store javaScript object/value to a JSON string
            const jsonreadListData = JSON.stringify(readListData)
            await AsyncStorage.setItem('read_list', jsonreadListData)
        } catch (e) {
            console.log(e);
        }
    }

    const addToReadList = (item: NewsList) => {
        storeReadingList(item);
        dispatch({ type: types.ADD_READITEM, payload: item })
    }

    const removeFromReadList = (item: NewsList) => {
        dispatch({ type: types.REMOVE_READITEM, payload: item })
    }

    //when press the readlist icon, either remove from readlist or add to realist
    const pressReadListIcon = (item: NewsList) => {
        if (state.readList) {

            //some method tests whether at least one element in the readlist passes the test implemented by the provided function
            const isInReadList = state.readList.some((read) => read && item && read.title === item.title)

            isInReadList
                ? removeFromReadList(item)
                : addToReadList(item)
        } else addToReadList(item)
    }


    const value = {
        readListData: state,
        pressReadListIcon: pressReadListIcon,
        addToReadList: addToReadList,
        removeFromReadList: removeFromReadList
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default Context;