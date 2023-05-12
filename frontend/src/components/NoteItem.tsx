import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GRAY_4, TEXT_GREY} from '../constants/colors';

type Props = {content: string; createdAt: string};

export const NoteItem: React.FC<Props> = ({content, createdAt}) => {
  const date = new Date(createdAt).toLocaleDateString('ru-RU');

  return (
    <View style={styles.item}>
      <Text style={styles.text} adjustsFontSizeToFit={false}>
        {content}
      </Text>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    width: '80%',
    color: TEXT_GREY,
  },
  dateText: {
    fontSize: 12,
    color: GRAY_4,
  },
});
