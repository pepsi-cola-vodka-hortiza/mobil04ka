import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListType} from '../../navigation/root/types';
import {GRAY_5, ORANGE, PINK_1} from '../../constants/colors';

type Props = {};

export const SignOutButton: React.FC<Props> = () => {
  const {replace} =
    useNavigation<StackNavigationProp<RootStackParamListType>>();

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('token');
      replace('Authentication', {screen: 'SignIn'});
    } catch (e) {
      console.warn(e);
    }
  }, [replace]);

  return (
    <TouchableOpacity style={styles.container} onPress={signOut}>
      <Text style={styles.text}>Выйти нах!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    backgroundColor: GRAY_5,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  text: {
    color: ORANGE,
  },
});
