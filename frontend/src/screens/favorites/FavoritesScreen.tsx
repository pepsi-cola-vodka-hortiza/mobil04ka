import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_MY_FAVORITES, GET_NOTES} from '../../gql/query';
import NoteList from '../../components/NoteList';

type Props = {};

const FavoritesScreen: React.FC<Props> = () => {
  const {data, loading, error, refetch} = useQuery(GET_MY_FAVORITES);

  return <></>;
};

export default FavoritesScreen;
