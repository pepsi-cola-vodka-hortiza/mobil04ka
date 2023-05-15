import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GRAY_1,
  GRAY_3,
  GRAY_4,
  GRAY_5,
  ORANGE,
  PINK_1,
  TEXT_INPUT_GREY,
} from '../../constants/colors';
import {useMutation, useQuery} from '@apollo/client';
import {CREATE_NOTE, UPDATE_NOTE} from '../../gql/mutation';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListType} from '../../navigation/root/types';
import {FeedStackParamListType} from '../../navigation/feed/types';
import {GET_NOTE, GET_NOTES} from '../../gql/query';

type navigationType = CompositeNavigationProp<
  StackNavigationProp<RootStackParamListType, 'CreateNote'>,
  StackNavigationProp<FeedStackParamListType>
>;

type Props = {};

const CreateNoteScreen: React.FC<Props> = () => {
  const {navigate} = useNavigation<navigationType>();
  const {id} =
    useRoute<RouteProp<RootStackParamListType, 'CreateNote'>>().params ?? {};

  const [content, setContent] = useState<string>();
  const {
    data: {note} = {},
    loading,
    error,
  } = useQuery(GET_NOTE, {variables: {id: id || undefined}});
  const {refetch} = useQuery(GET_NOTES);

  const [createNote] = useMutation(CREATE_NOTE, {
    onCompleted: () => {
      refetch();
      navigate('Feed');
    },
  });

  const [updateNote] = useMutation(UPDATE_NOTE, {
    onCompleted: () => {
      refetch();
      navigate('Feed');
    },
  });

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        onChangeText={text => setContent(text)}
        placeholder="Type your note.."
        placeholderTextColor={GRAY_4}
        value={content}
        textAlignVertical="top"
        defaultValue={id ? note?.content : null}
        multiline={true}
        autoCapitalize="none"
      />
      {id ? (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => updateNote({variables: {updateNoteId: id, content}})}>
          <Text style={styles.updateButtonText}>Апдейт</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => createNote({variables: {content}})}>
          <Text style={styles.createButtonText}>Запостить</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: GRAY_1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  input: {
    fontSize: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: GRAY_3,
    color: TEXT_INPUT_GREY,
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: GRAY_5,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  createButtonText: {
    fontSize: 16,
    color: PINK_1,
  },
  updateButtonText: {
    fontSize: 16,
    color: ORANGE,
  },
});

export default CreateNoteScreen;
