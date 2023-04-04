import React, {useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListType} from '../../../navigation/root/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserForm from '../components/UserForm';
import {useMutation} from '@apollo/client';
import {SIGNIN_USER} from '../../../gql/mutation';
import {AuthenticationFormType} from '../components/types';
import {GRAY_1, INDIGO_2, TEXT_GREY} from '../../../constants/colors';

type Props = {};

const SignInScreen: React.FC<Props> = () => {
  const {replace, navigate} =
    useNavigation<StackNavigationProp<RootStackParamListType>>();
  const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
    onCompleted: data => storeToken(data.signIn),
  });

  const navigateToSignUp = useCallback(() => {
    navigate('Authentication', {screen: 'SignUp'});
  }, [navigate]);

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
      <UserForm formType={AuthenticationFormType.SignIn} action={signIn} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>No Account?</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={navigateToSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    backgroundColor: GRAY_1,
    height: '100%',
  },
  textContainer: {
    margin: 16,
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    color: TEXT_GREY,
  },
  buttonContainer: {
    borderBottomWidth: 1,
    borderColor: INDIGO_2,
  },
  buttonText: {
    fontSize: 14,
    color: INDIGO_2,
  },
});

export default SignInScreen;