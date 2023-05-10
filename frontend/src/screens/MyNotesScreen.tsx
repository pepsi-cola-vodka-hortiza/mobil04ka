import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_MY_FAVORITES, GET_MY_NOTES} from '../gql/query';
import NoteList from '../components/NoteList';
import {GRAY_1, TEXT_GREY} from '../constants/colors';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListType} from '../navigation/root/types';
import {MyNotesStackParamListType} from '../navigation/my-notes/types';

type Props = {};

type navigationType = CompositeNavigationProp<
  StackNavigationProp<RootStackParamListType, 'CreateNote'>,
  StackNavigationProp<MyNotesStackParamListType>
>;

const MyNotesScreen: React.FC<Props> = () => {
  const {navigate} = useNavigation<navigationType>();
  const {data: {me} = {}, loading, error, refetch} = useQuery(GET_MY_NOTES);
  const onPress = useCallback(
    (id: string) => {
      navigate('CreateNote', {id});
    },
    [navigate],
  );

  return (
    <View style={styles.wrapper}>
      {me?.notes.length !== 0 ? (
        <NoteList
          notes={me?.notes}
          loading={loading}
          refetch={refetch}
          onPressHandler={onPress}
        />
      ) : (
        <Text style={styles.text}>Нет постов.</Text>
      )}
    </View>
  );
};

export default MyNotesScreen;

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
