import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamListType} from './types';
import NoteDetailsScreen from '../../screens/details/NoteDetailsScreen';
import TabNavigator from '../tab/navigator';
import {rootStackOptions} from '../options';
import {AuthenticationStackNavigator} from '../authentication/navigator';

export const RootStackNavigator = ({}): JSX.Element => {
  const RootStack = createStackNavigator<RootStackParamListType>();
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Authentication"
        component={AuthenticationStackNavigator}
        options={rootStackOptions}
      />
      <RootStack.Screen
        name="RootTabs"
        component={TabNavigator}
        options={rootStackOptions}
      />
      <RootStack.Screen name="NoteDetails" component={NoteDetailsScreen} />
    </RootStack.Navigator>
  );
};
