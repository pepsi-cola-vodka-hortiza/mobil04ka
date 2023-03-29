import React, {useCallback, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NoteModel} from '../types';
import {NoteItem} from './NoteItem';
import {GREY_1} from '../constants/colors';
import {ApolloQueryResult, OperationVariables} from '@apollo/client';
import Spinner from './Spinner';

type Props = {
  notes: NoteModel[];
  loading: boolean;
  refetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<any>>;
  onPressHandler?: (noteId: string) => void;
};

const NoteList: React.FC<Props> = ({
  notes,
  loading,
  refetch,
  onPressHandler,
}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <>
      <FlatList
        style={styles.list}
        data={notes}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onPressHandler(item.id)}>
            <NoteItem content={item.content} />
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {loading && <Spinner />}
    </>
  );
};

export default NoteList;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    backgroundColor: GREY_1,
  },
});
