import React from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {
  HeartIcon,
  PaperBagIcon,
  ThunderIcon,
  SettingsIcon,
} from '../components/icon';
import {StackNavigationOptions} from '@react-navigation/stack';

export const tabBarNavigatorOptions: {lazy: boolean} = {
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
