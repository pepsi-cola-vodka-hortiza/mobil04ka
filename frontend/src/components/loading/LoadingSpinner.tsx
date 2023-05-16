import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {ORANGE} from '../../constants/colors';
import {Animated, StyleSheet} from 'react-native';
import View = Animated.View;

type LoadingSpinnerProps = {};

const LoadingSpinner = ({}: LoadingSpinnerProps): JSX.Element => {
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator animating={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 80,
    minHeight: 80,
    opacity: 0.59,
    backgroundColor: ORANGE,
    borderRadius: 16,
  },
});

export default LoadingSpinner;
