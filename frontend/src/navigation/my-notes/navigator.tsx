import React from 'react';
import {MyNotesStackParamListType} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import MyNotesScreen from '../../screens/MyNotesScreen';

const MyNotesStack = createStackNavigator<MyNotesStackParamListType>();

export const MyNotesNavigator = (): JSX.Element | null => {
  return (
    <MyNotesStack.Navigator>
      <MyNotesStack.Screen name="MyNotes" component={MyNotesScreen} />
    </MyNotesStack.Navigator>
  );
};

export default MyNotesNavigator;
