import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListType} from '../../navigation/root/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserForm from '../../components/UserForm';

type Props = {};

const LoginScreen: React.FC<Props> = () => {
  const {replace} =
    useNavigation<StackNavigationProp<RootStackParamListType>>();

  const storeToken = async () => {
    await AsyncStorage.setItem('token', 'abc');
    replace('RootTabs');
  };

  const checkLoginState = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return;
    }
    /*navigate('RootTabs');*/
  };

  useEffect(() => {
    checkLoginState();
  });

  return (
    <View>
      <UserForm />
    </View>
  );
};

export default LoginScreen;
