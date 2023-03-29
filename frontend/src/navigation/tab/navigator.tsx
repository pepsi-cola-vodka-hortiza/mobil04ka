import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamListType} from './types';
import FeedNavigator from '../feed/navigator';
import MyNotesNavigator from '../my-notes/navigator';
import FavoritesNavigator from '../favorites/navigator';
import {
  favoritesStackOptions,
  feedStackOptions,
  myNotesStackOptions,
  tabBarNavigatorOptions,
} from '../options';

const Tab = createBottomTabNavigator<BottomTabParamListType>();

export const TabNavigator = (): JSX.Element | null => {
  return (
    <Tab.Navigator screenOptions={tabBarNavigatorOptions}>
      <Tab.Screen
        navigationKey="FeedStack"
        name="Feed"
        options={feedStackOptions}
        component={FeedNavigator}
      />

      <Tab.Screen
        navigationKey="MyNotesStack"
        name="Mine"
        options={myNotesStackOptions}
        component={MyNotesNavigator}
      />

      <Tab.Screen
        navigationKey="FavoritesStack"
        name="Favorites"
        options={favoritesStackOptions}
        component={FavoritesNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;