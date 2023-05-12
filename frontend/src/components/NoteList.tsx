import React, {useCallback, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NoteModel} from '../types';
import {NoteItem} from './NoteItem';
import {GRAY_1, GRAY_2} from '../constants/colors';
import {ApolloQueryResult, OperationVariables} from '@apollo/client';
import Spinner from './Spinner';
import LikeWrapper from './LikeWrapper';

type Props = {
  notes: NoteModel[];
  toggleFavorites: any;
  favorites: NoteModel[];
  loading: boolean;
  refetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<any>>;
  onPressHandler?: (noteId: string) => void;
};

const NoteList: React.FC<Props> = ({
  notes,
  toggleFavorites,
  favorites,
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
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={notes}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.noteWrapper}
            onPress={() => onPressHandler(item.id)}>
            <NoteItem content={item.content} createdAt={item.createdAt} />
            {item.id && favorites && item?.favoritedBy ? (
              <LikeWrapper
                id={item.id}
                favoriteCount={item?.favoriteCount}
                toggleFavorites={toggleFavorites}
                favorites={favorites}
              />
            ) : null}
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
    backgroundColor: GRAY_1,
  },
  noteWrapper: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: GRAY_2,
  },
});
