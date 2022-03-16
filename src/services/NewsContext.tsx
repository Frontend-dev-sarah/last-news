import React, { useReducer } from 'react';
import { NewsList } from '../types/NewsList';
import { Category } from '../types/Category';

const newsHotListApi = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=1a987bcb24e5484fa38dd18aea4c74bb';
const newsListApi = 'https://newsapi.org/v2/everything?apiKey=1a987bcb24e5484fa38dd18aea4c74bb'

// An enum with all the types of actions to use in reducer
enum types {
    FETCH_NEWSLIST = 'FETCH_NEWSLIST',
    FETCH_SEARCHLIST = 'FETCH_SEARCHLIST',
    FETCH_SEARCHLIST_MORE = 'FETCH_SEARCHLIST_MORE',
    FETCH_PENDING_LIST = 'FETCH_PENDING_LIST',
    FETCH_PENDING_SEARCH = 'FETCH_PENDING_SEARCH',
    FETCH_FAILURE_LIST = 'FETCH_FAILURE_LIST',
    FETCH_FAILURE_SEARCH = 'FETCH_FAILURE_SEARCH',
}

// An interface for actions
interface NewsAction {
    type: types;
    payload?: any;
}
// An interface for state
interface NewsState {
    isFetchingList: boolean,
    isFetchingSearch: boolean,
    error: boolean,
    searchError: boolean,
    stillFetch: boolean,
    newsList: NewsList[],
    searchNewsList: NewsList[]
}

const initialState = {
    isFetchingList: false,
    isFetchingSearch: false,
    error: false,
    searchError: false,
    stillFetch: true,
    newsList: [],
    searchNewsList: []
}

export interface NewsProviderProps {
    children: React.ReactNode
    // newsListData: NewsState,
    // fetchNewsList: (category: string) => void,
    // fetchSearchResults?: (searchTerm: string, pageSize: number, page: number) => void
}
export interface NewsContextType {
    newsListData: NewsState,
    fetchNewsList: (category: Category) => void,
    fetchSearchResults?: (searchTerm: string, pageSize: number, page: number) => void
}

const Context = React.createContext<NewsContextType | null>(null);


const newsReducer = (state: NewsState, action: NewsAction) => {
    switch (action.type) {
        case types.FETCH_NEWSLIST:
            return {
                ...state,
                newsList: action.payload,
                isFetchingList: false,
                isFetchingSearch: false,
                error: false,
                searchError: false,
                stillFetch: false
            }
        case types.FETCH_SEARCHLIST:
            return {
                ...state,
                searchNewsList: action.payload,
                isFetchingList: false,
                isFetchingSearch: false,
                error: false,
                searchError: false,
            }
        case types.FETCH_SEARCHLIST_MORE:
            return {
                ...state,
                searchNewsList: state.searchNewsList.concat(action.payload),
                isFetchingList: false,
                isFetchingSearch: false,
                error: false,
                searchError: false,
            }
        case types.FETCH_PENDING_LIST:
            return {
                ...state,
                isFetchingList: true,
                isFetchingSearch: false,
                error: false,
                searchError: false,
                stillFetch: false
            }
        case types.FETCH_PENDING_SEARCH:
            return {
                ...state,
                isFetchingList: false,
                isFetchingSearch: true,
                error: false,
                searchError: false,
                stillFetch: false
            }
        case types.FETCH_FAILURE_LIST: {
            return {
                ...state,
                isFetchingList: false,
                isFetchingSearch: false,
                error: true,
                searchError: false,
                stillFetch: false
            }
        }
        case types.FETCH_FAILURE_SEARCH: {
            return {
                ...state,
                isFetchingList: false,
                isFetchingSearch: false,
                error: false,
                searchError: true,
                stillFetch: false
            }
        }
        default:
            return state;
    }
}

export const NewsProvider = ({ children }: NewsProviderProps) => {

    const [state, dispatch] = useReducer(newsReducer, initialState);

    const fetchNewsList = (category: Category) => {
        dispatch({ type: types.FETCH_PENDING_LIST })
        fetch(newsHotListApi + `&category=${category}`, {
            method: 'get'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const newsList = responseJson.articles;
                responseJson.code === 'apiKeyInvalid'
                    ? dispatch({ type: types.FETCH_FAILURE_LIST })
                    : responseJson.status === 'ok'
                        ? dispatch({ type: types.FETCH_NEWSLIST, payload: { newsList } })
                        : null
                return responseJson;
            })
    }

    const fetchSearchResults = (searchTerm: string, pageSize = 50, page = 1) => {
        page > 1 ? null : dispatch({ type: types.FETCH_PENDING_SEARCH })

        fetch(newsListApi + `&q=${searchTerm}&page=${page}&pageSize=${pageSize}`, {
            method: 'get'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const searchNewsList = responseJson.articles
                if (responseJson.code === 'apiKeyInvalid') {
                    dispatch({ type: types.FETCH_FAILURE_SEARCH })
                } else {
                    if (page > 1) {
                        dispatch({ type: types.FETCH_SEARCHLIST_MORE, payload: searchNewsList })
                    } else {
                        dispatch({ type: types.FETCH_SEARCHLIST, payload: searchNewsList })
                    }
                }
                return responseJson;
            })
    }

    const value = {
        newsListData: state,
        fetchNewsList: fetchNewsList,
        fetchSearchResults: fetchSearchResults
    }


    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default Context;