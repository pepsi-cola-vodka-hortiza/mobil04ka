import React from 'react';
import {FavoritesStackParamListType} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from '../../screens/favorites/FavoritesScreen';

const FavoritesStack = createStackNavigator<FavoritesStackParamListType>();

export const FavoritesNavigator = (): JSX.Element | null => {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} />
    </FavoritesStack.Navigator>
  );
};

export default FavoritesNavigator;
