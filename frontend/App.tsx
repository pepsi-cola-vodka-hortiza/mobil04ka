import React, {useCallback, useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import type {ReactNode} from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {RootStackNavigator} from './src/navigation/root/navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NotificationProvider} from './src/components/notification';
import {Provider as PaperProvider} from 'react-native-paper';

const httpLink = createHttpLink({uri: 'http://localhost:4000/api'});

const authLink = setContext(async (_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: (await AsyncStorage.getItem('token')) || '',
    },
  };
});

const client = new ApolloClient({
  // @ts-ignore
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

type InitialAppRouteType = 'RootTabs' | 'Authentication';

const App: () => ReactNode = () => {
  const [initialRouteName, setInitialRouteName] =
    useState<InitialAppRouteType>();

  const checkLoginState = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      setInitialRouteName('Authentication');
    } else {
      setInitialRouteName('RootTabs');
    }
  }, []);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NotificationProvider>
          <NavigationContainer>
            {initialRouteName && (
              <RootStackNavigator
                initialRouteName={initialRouteName}></RootStackNavigator>
            )}
          </NavigationContainer>
        </NotificationProvider>
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;
