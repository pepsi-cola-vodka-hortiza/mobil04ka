import React from 'react';
import {View, Button} from 'react-native';

type Props = {};

const SettingsScreen: React.FC<Props> = () => {
  return (
    <View>
      <Button title="Sign out!" />
    </View>
  );
};

export default SettingsScreen;
