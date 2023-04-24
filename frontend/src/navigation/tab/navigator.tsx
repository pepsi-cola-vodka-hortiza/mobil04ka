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
  settingsOptions,
  tabBarNavigatorOptions,
} from '../options';
import SettingsScreen from '../../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator<BottomTabParamListType>();

export const TabNavigator = (): JSX.Element | null => {
  return (
    <Tab.Navigator screenOptions={tabBarNavigatorOptions}>
      <Tab.Screen
        navigationKey="FeedStack"
        name="FeedStack"
        options={feedStackOptions}
        component={FeedNavigator}
      />

      <Tab.Screen
        navigationKey="MyNotesStack"
        name="MineStack"
        options={myNotesStackOptions}
        component={MyNotesNavigator}
      />

      <Tab.Screen
        navigationKey="FavoritesStack"
        name="FavoritesStack"
        options={favoritesStackOptions}
        component={FavoritesNavigator}
      />

      <Tab.Screen
        navigationKey="Settings"
        name="SettingsStack"
        options={settingsOptions}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
