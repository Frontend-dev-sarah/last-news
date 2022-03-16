# News

Discover the latest news

## Get Started

1. Install [Expo CLI](https://docs.expo.io/versions/latest/workflow/expo-cli/)

```sh
[sudo] npm install -g expo-cli
```

2. Clone the project

```sh
git clone https://github.com/Frontend-dev-sarah/news.git
```

3. Installation of dependencies

```sh
cd news

npm install
```

4. Run the cross-platform app (uses [Expo](https://expo.io/learn))

```sh
npm start
# or
expo start
```

5. Mobile setup

- Install 'Expo' application on your android/iOS device. You can find the links to Android and iOS apps [here](https://expo.io/tools#client).
- Scan the QR code shown on the terminal.
- Once the QR code is successfully scanned, it will take few seconds to load and render the app.

6. Setup push notifications

Check the official [Expo docs](https://docs.expo.dev/versions/latest/sdk/notifications/) for push notifications

- Make sure to download and install the Expo Go app to your physical devices(See step 5), push notifications don't work on simulators/emulators
- Make sure allow notifications for Expo Go app in your physical devices, otherwise you won't be able to test notifications
- Log into your expo account in the terminal via

```
expo login
```

then login with your email and password, otherwise you won't be able to get the notification token.

- Enjoy !

## API documentation

This project use the news API:
https://newsapi.org/docs

The API key is valid for 100 requests per day, you have to create a new account or wait for 24h to reuse the API. If neccessary, please create your own account by following this [link](https://newsapi.org/register), then go to "src/services/NewsContext.jsx" to replace the apiKey with your own key.

- Get [Top headlines](https://newsapi.org/docs/endpoints/top-headlines) API

- Get [Search query](https://newsapi.org/docs/endpoints/everything) API

## General informations

This main packages installed

- react-native-elements
- react-native-collapsible
- @react-native-async-storage/async-storage
- expo-notifications

The app is built using functionnal components

- useEffect
- useState
- useContext
- useReducer
- useRef

Main functionalities of the app

- Fetch hot news list
- Fetch news list based on different news categories
- Show more or less news details in the news list with collapsible component
- Go to review the news source page with the Source Link
- Show news details with stack navigation
- Search for news using the Search Bar
- Show a list of search results with paging
- Add/remove a news to/from read list with a tinted color
- Push notification with Expo Go app
