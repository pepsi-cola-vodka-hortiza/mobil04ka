import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View, TextInput} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_NOTE} from '../../gql/query';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamListType} from '../../navigation/root/types';
import {
  GRAY_1,
  GRAY_2,
  GRAY_3,
  GRAY_4,
  GRAY_6,
  TEXT_GREY,
  TEXT_INPUT_GREY,
} from '../../constants/colors';
import Comments from '../../components/comments/Comments';

type Props = {};

const NoteDetailsScreen: React.FC<Props> = () => {
  const {id} =
    useRoute<RouteProp<RootStackParamListType, 'NoteDetails'>>().params;
  const [comment, setComment] = useState<string>();

  const {
    data: {note} = {},
    loading,
    error,
    refetch,
  } = useQuery(GET_NOTE, {variables: {id}});

  return (
    <View style={styles.wrapper}>
      <View style={styles.note}>
        <Text style={styles.text}>{note?.content}</Text>
      </View>
      <Comments refetch={refetch} comments={note?.comments} />
      <TextInput
        style={styles.input}
        onChangeText={text => setComment(text)}
        placeholder="Type your comment.."
        placeholderTextColor={GRAY_4}
        value={comment}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: GRAY_1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  note: {
    alignSelf: 'flex-start',
    padding: 8,
    borderWidth: 1,
    borderColor: GRAY_2,
    backgroundColor: GRAY_6,
    borderRadius: 12,
  },
  text: {
    color: TEXT_GREY,
  },
  input: {
    fontSize: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: GRAY_3,
    color: TEXT_INPUT_GREY,
    width: '100%',
  },
});

export default NoteDetailsScreen;
