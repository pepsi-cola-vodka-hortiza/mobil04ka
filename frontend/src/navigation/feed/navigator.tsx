import React from 'react';
import FeedScreen from '../../screens/feed/FeedScreen';
import {FeedStackParamListType} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import {headerOptions} from '../options';

const FeedStack = createStackNavigator<FeedStackParamListType>();

export const FeedNavigator = (): JSX.Element | null => {
  return (
    <FeedStack.Navigator screenOptions={headerOptions}>
      <FeedStack.Screen name="Feed" component={FeedScreen} />
    </FeedStack.Navigator>
  );
};

export default FeedNavigator;
