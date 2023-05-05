import React, {useCallback, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {LikeIcon, LikeOutlinedIcon} from './icon';
import {NoteModel} from '../types';
import {TEXT_GREY} from '../constants/colors';

type Props = {
  favorites: NoteModel[];
  toggleFavorites: any;
  favoriteCount: number;
  id: string;
};

const LikeWrapper: React.FC<Props> = ({
  favorites,
  favoriteCount,
  toggleFavorites,
  id,
}) => {
  const [isActive, setActive] = useState(
    favorites?.filter(note => note.id === id).length > 0,
  );

  const onClickHandler = useCallback(() => {
    setActive(!isActive);
    toggleFavorites({variables: {id}});
  }, [id, isActive, toggleFavorites]);

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onClickHandler}>
      {isActive ? <LikeIcon /> : <LikeOutlinedIcon />}
      <Text style={styles.text}>{favoriteCount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: TEXT_GREY,
    marginLeft: 4,
  },
});

export default LikeWrapper;
