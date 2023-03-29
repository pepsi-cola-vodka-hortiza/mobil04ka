import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_NOTES} from '../../gql/query';
import {GREY_1, INDIGO_1} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListType} from '../../navigation/root/types';
import {AddIcon} from '../../components/icon';
import NoteList from '../../components/NoteList';

type Props = {};

const FeedScreen: React.FC<Props> = () => {
  const {navigate} =
    useNavigation<StackNavigationProp<RootStackParamListType>>();
  const {data: {notes} = {}, loading, error, refetch} = useQuery(GET_NOTES);

  const onPress = useCallback(
    (id: string) => {
      navigate('NoteDetails', {id});
    },
    [navigate],
  );

  return (
    <>
      <NoteList
        notes={notes}
        loading={loading}
        refetch={refetch}
        onPressHandler={onPress}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => console.log('yo')}>
        <AddIcon />
      </TouchableOpacity>
    </>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    backgroundColor: GREY_1,
  },
  buttonContainer: {
    position: 'absolute',
    backgroundColor: INDIGO_1,
    marginHorizontal: 16,
    bottom: 36,
    borderRadius: 24,
    right: 0,
  },
});
