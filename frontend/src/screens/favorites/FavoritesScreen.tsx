import React, {useCallback, useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {GET_MY_FAVORITES} from '../../gql/query';
import NoteList from '../../components/NoteList';
import {StyleSheet, Text, View} from 'react-native';
import {GRAY_1, TEXT_GREY} from '../../constants/colors';

type Props = {};

const FavoritesScreen: React.FC<Props> = () => {
  const {data: {me} = {}, loading, error, refetch} = useQuery(GET_MY_FAVORITES);
  const onPress = useCallback(() => {
    console.log('yo');
  }, []);

  return (
    <View style={styles.wrapper}>
      {me?.favorites.length !== 0 ? (
        <NoteList
          notes={me?.favorites}
          loading={loading}
          refetch={refetch}
          onPressHandler={onPress}
        />
      ) : (
        <Text style={styles.text}>No favorites posts.</Text>
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: GRAY_1,
    height: '100%',
  },
  text: {
    padding: 16,
    fontSize: 14,
    color: TEXT_GREY,
  },
});
