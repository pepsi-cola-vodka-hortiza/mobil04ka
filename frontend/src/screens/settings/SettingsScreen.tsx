import React, {useCallback} from 'react';
import {View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListType} from '../../navigation/root/types';

type Props = {};

const SettingsScreen: React.FC<Props> = () => {
  const {replace} =
    useNavigation<StackNavigationProp<RootStackParamListType>>();

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('token');
      replace('Authentication');
    } catch (e) {
      console.warn(e);
    }
  }, [replace]);

  return (
    <View>
      <Button title="Sign out!" onPress={signOut} />
    </View>
  );
};

export default SettingsScreen;
