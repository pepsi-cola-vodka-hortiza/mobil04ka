import React, {useCallback, useEffect} from 'react';
import {View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListType} from '../../../navigation/root/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserForm from '../components/UserForm';
import {useMutation} from '@apollo/client';
import {SIGNIN_USER} from '../../../gql/mutation';

type Props = {};

const SignUpScreen: React.FC<Props> = () => {
  const {replace} =
    useNavigation<StackNavigationProp<RootStackParamListType>>();
  const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
    onCompleted: data => storeToken(data.signIn),
  });

  const storeToken = useCallback(
    async (token: string) => {
      try {
        await AsyncStorage.setItem('token', token);
        replace('RootTabs');
      } catch (e) {
        console.warn(e);
      }
    },
    [replace],
  );

  const checkLoginState = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return;
    }
    /*navigate('RootTabs');*/
  }, []);

  useEffect(() => {
    checkLoginState();
  });

  return (
    <View>
      <UserForm action={signIn} />
    </View>
  );
};

export default SignUpScreen;
