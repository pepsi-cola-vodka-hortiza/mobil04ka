import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_NOTE} from '../../gql/query';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamListType} from '../../navigation/root/types';

type Props = {};

const NoteDetailsScreen: React.FC<Props> = () => {
  const {id} =
    useRoute<RouteProp<RootStackParamListType, 'NoteDetails'>>().params;
  const {
    data: {note} = {},
    loading,
    error,
    refetch,
  } = useQuery(GET_NOTE, {variables: {id}});

  return <Text>{'sas'}</Text>;
};

export default NoteDetailsScreen;

const styles = StyleSheet.create({});
