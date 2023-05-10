import React from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {
  HeartIcon,
  PaperBagIcon,
  ThunderIcon,
  SettingsIcon,
} from '../components/icon';
import {StackNavigationOptions} from '@react-navigation/stack';
import {GRAY_3, PURPLE_2, TEXT_GREY} from '../constants/colors';
import {SignOutButton} from './components/SignOutButton';

export const tabBarNavigatorOptions: {lazy: boolean} = {
  tabBarStyle: {
    backgroundColor: GRAY_3,
    borderTopWidth: 0,
  },
  tabBarLabelStyle: {
    color: TEXT_GREY,
  },
  tabBarActiveBackgroundColor: PURPLE_2,
  lazy: true,
};

export const rootStackOptions: StackNavigationOptions = {
  headerShown: false,
};

export const feedStackOptions: BottomTabNavigationOptions = {
  tabBarIcon: () => <ThunderIcon />,
  headerShown: false,
};

export const favoritesStackOptions: BottomTabNavigationOptions = {
  tabBarIcon: () => <HeartIcon />,
  headerShown: false,
};

export const myNotesStackOptions: BottomTabNavigationOptions = {
  tabBarIcon: () => <PaperBagIcon />,
  headerShown: false,
};

export const settingsOptions: BottomTabNavigationOptions = {
  tabBarIcon: () => <SettingsIcon />,
  headerShown: false,
};

export const headerOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: GRAY_3,
  },
  headerShadowVisible: false,
  headerTintColor: TEXT_GREY,
  headerRight: () => <SignOutButton />,
};
