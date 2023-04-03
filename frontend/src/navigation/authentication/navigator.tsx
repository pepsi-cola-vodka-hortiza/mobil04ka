import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthenticationStackParamListType} from './types';
import TabNavigator from '../tab/navigator';
import {rootStackOptions} from '../options';
import SignInScreen from '../../screens/authentication/signin/SignInScreen';

export const AuthenticationStackNavigator = ({}): JSX.Element => {
  const AuthenticationStack =
    createStackNavigator<AuthenticationStackParamListType>();
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={rootStackOptions}
      />
      <AuthenticationStack.Screen
        name="SignUp"
        component={TabNavigator}
        options={rootStackOptions}
      />
    </AuthenticationStack.Navigator>
  );
};
