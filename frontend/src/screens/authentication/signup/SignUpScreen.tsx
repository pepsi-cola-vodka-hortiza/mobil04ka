import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListType} from '../../../navigation/root/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserForm from '../components/UserForm';
import {useMutation} from '@apollo/client';
import {SIGNUP_USER} from '../../../gql/mutation';
import {AuthenticationFormType} from '../components/types';
import {StyleSheet, View} from 'react-native';
import {GRAY_1} from '../../../constants/colors';

type Props = {};

const SignUpScreen: React.FC<Props> = () => {
  const {replace} =
    useNavigation<StackNavigationProp<RootStackParamListType>>();
  const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
    onCompleted: data => storeToken(data.signUp),
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

  return (
    <View style={styles.wrapper}>
      <UserForm formType={AuthenticationFormType.SignUp} action={signUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    backgroundColor: GRAY_1,
    height: '100%',
  },
});

export default SignUpScreen;
