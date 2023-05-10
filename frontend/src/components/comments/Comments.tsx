import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {CommentModel} from '../../types';
import {
  GRAY_4,
  GRAY_5,
  INDIGO_1,
  PINK_1,
  TEXT_GREY,
} from '../../constants/colors';
import {ApolloQueryResult, OperationVariables} from '@apollo/client';

type Props = {
  comments?: CommentModel[];
  remove: (commentId: string) => Promise<void>;
  refetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<any>>;
};

const Comments: React.FC<Props> = ({remove, refetch, comments}) => {
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
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={styles.item}>
          <View style={styles.itemTitle}>
            <Text style={styles.selectedText}>{item.author.username}</Text>
            <TouchableOpacity onPress={() => remove(item.id)}>
              <Text style={styles.cross}>х</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  ) : (
    <View style={styles.textContainer}>
      <Text style={styles.selectedText}>Комментариев нет</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  cross: {
    color: GRAY_4,
    fontSize: 20,
  },
  item: {
    marginVertical: 16,
  },
  itemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    marginTop: 24,
    marginBottom: 'auto',
  },
  selectedText: {
    alignSelf: 'flex-start',
    color: PINK_1,
    backgroundColor: GRAY_5,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  text: {
    marginTop: 4,
    color: TEXT_GREY,
    borderColor: INDIGO_1,
    borderLeftWidth: 2,
    paddingLeft: 12,
    paddingVertical: 8,
  },
});

export default Comments;
