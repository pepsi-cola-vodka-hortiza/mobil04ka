import React from 'react';
import FeedScreen from '../../screens/feed/FeedScreen';
import {FeedStackParamListType} from './types';
import {createStackNavigator} from '@react-navigation/stack';

const FeedStack = createStackNavigator<FeedStackParamListType>();

export const FeedNavigator = (): JSX.Element | null => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={FeedScreen} />
    </FeedStack.Navigator>
  );
};

export default FeedNavigator;
