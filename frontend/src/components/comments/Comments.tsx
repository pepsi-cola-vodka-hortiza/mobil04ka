import React, {useCallback, useState} from 'react';
import {StyleSheet, FlatList, View, Text, RefreshControl} from 'react-native';
import {CommentModel} from '../../types';
import {GRAY_5, INDIGO_1, PINK_1, TEXT_GREY} from '../../constants/colors';
import {ApolloQueryResult, OperationVariables} from '@apollo/client';

type Props = {
  comments?: CommentModel[];
  refetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<any>>;
};

const Comments: React.FC<Props> = ({refetch, comments}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return comments?.length !== 0 ? (
    <FlatList
      data={comments}
      keyExtractor={({id}) => id}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.username}>{item.author.username}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  ) : null;
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  item: {
    marginVertical: 16,
  },
  username: {
    alignSelf: 'flex-start',
    color: PINK_1,
    backgroundColor: GRAY_5,
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 8,
  },
  text: {
    color: TEXT_GREY,
    borderColor: INDIGO_1,
    borderLeftWidth: 2,
    paddingLeft: 12,
    paddingVertical: 8,
  },
});

export default Comments;
