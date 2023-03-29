import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {PURPLE_1} from '../constants/colors';

type Props = {};

const Spinner: React.FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={PURPLE_1} />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
