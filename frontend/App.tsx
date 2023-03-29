import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import type {ReactNode} from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {RootStackNavigator} from './src/navigation/root/navigator';

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache(),
});

const App: () => ReactNode = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootStackNavigator></RootStackNavigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
