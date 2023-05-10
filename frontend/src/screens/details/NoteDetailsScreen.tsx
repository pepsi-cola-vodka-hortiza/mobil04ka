import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import {GET_NOTE} from '../../gql/query';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamListType} from '../../navigation/root/types';
import {
  GRAY_1,
  GRAY_2,
  GRAY_3,
  GRAY_4,
  GRAY_6,
  INDIGO_1,
  TEXT_GREY,
  TEXT_INPUT_GREY,
} from '../../constants/colors';
import Comments from '../../components/comments/Comments';
import {ADD_COMMENT, REMOVE_COMMENT} from '../../gql/mutation';

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

  const [removeComment] = useMutation(REMOVE_COMMENT, {
    onCompleted: () => {
      console.log('ok');
      refetch();
    },
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      refetch();
      setComment(undefined);
    },
  });

  const handleSubmit = useCallback(async () => {
    await addComment({variables: {id, text: comment}});
  }, [addComment, comment, id]);

  const remove = useCallback(
    async (commentId: string) => {
      await removeComment({variables: {noteId: id, commentId}});
    },
    [id, removeComment],
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.note}>
        <Text style={styles.text}>{note?.content}</Text>
      </View>
      <Comments remove={remove} refetch={refetch} comments={note?.comments} />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={text => setComment(text)}
          placeholder="Type your comment.."
          placeholderTextColor={GRAY_4}
          value={comment}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.buttonText}>ОК</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: GRAY_1,
    justifyContent: 'space-between',
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
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: GRAY_3,
    color: TEXT_INPUT_GREY,
    width: '90%',
  },
  buttonContainer: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: INDIGO_1,
  },
  buttonText: {
    fontSize: 16,
    color: INDIGO_1,
  },
});

export default NoteDetailsScreen;
