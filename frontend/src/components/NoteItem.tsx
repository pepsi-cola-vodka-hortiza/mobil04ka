import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GRAY_2, TEXT_GREY} from '../constants/colors';

type Props = {content: string};

export const NoteItem: React.FC<Props> = ({content}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY_2,
  },
  text: {
    fontSize: 16,
    color: TEXT_GREY,
  },
});
