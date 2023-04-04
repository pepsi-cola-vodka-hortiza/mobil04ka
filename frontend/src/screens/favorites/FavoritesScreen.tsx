import React, {useCallback, useState} from 'react';
import {useQuery} from '@apollo/client';
import {GET_MY_FAVORITES} from '../../gql/query';
import NoteList from '../../components/NoteList';

type Props = {};

const FavoritesScreen: React.FC<Props> = () => {
  const {data: {me} = {}, loading, error, refetch} = useQuery(GET_MY_FAVORITES);
  const onPress = useCallback(() => {
    console.log('yo');
  }, []);
  return (
    <>
      <NoteList
        notes={me.favorites}
        loading={loading}
        refetch={refetch}
        onPressHandler={onPress}
      />
    </>
  );
};

export default FavoritesScreen;
