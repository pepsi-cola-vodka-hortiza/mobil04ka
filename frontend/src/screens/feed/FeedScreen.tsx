import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import {GET_MY_FAVORITES, GET_NOTES} from '../../gql/query';
import {INDIGO_1} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListType} from '../../navigation/root/types';
import {AddIcon} from '../../components/icon';
import NoteList from '../../components/NoteList';
import {TOGGLE_FAVORITE} from '../../gql/mutation';

type Props = {};

const FeedScreen: React.FC<Props> = () => {
  const {navigate} =
    useNavigation<StackNavigationProp<RootStackParamListType>>();
  const {data: {notes} = {}, loading, error, refetch} = useQuery(GET_NOTES);
  const {data: {me} = {}} = useQuery(GET_MY_FAVORITES);
  const [toggleFavorites] = useMutation(TOGGLE_FAVORITE, {
    refetchQueries: [{query: GET_NOTES}, {query: GET_MY_FAVORITES}],
  });

  const navigateToNoteDetails = useCallback(
    (id: string) => {
      navigate('NoteDetails', {id});
    },
    [navigate],
  );

  const navigateToCreateNote = useCallback(() => {
    navigate('CreateNote');
  }, [navigate]);

  return (
    <>
      <NoteList
        notes={notes}
        toggleFavorites={toggleFavorites}
        favorites={me?.favorites}
        loading={loading}
        refetch={refetch}
        onPressHandler={navigateToNoteDetails}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={navigateToCreateNote}>
        <AddIcon />
      </TouchableOpacity>
    </>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    backgroundColor: INDIGO_1,
    marginHorizontal: 16,
    bottom: 36,
    borderRadius: 24,
    right: 0,
  },
});
