import React from 'react';
import {FavoritesStackParamListType} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from '../../screens/favorites/FavoritesScreen';
import {headerOptions} from '../options';

const FavoritesStack = createStackNavigator<FavoritesStackParamListType>();

export const FavoritesNavigator = (): JSX.Element | null => {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        options={headerOptions}
        name="Favorites"
        component={FavoritesScreen}
      />
    </FavoritesStack.Navigator>
  );
};

export default FavoritesNavigator;
