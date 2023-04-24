import React, {useCallback, useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {LikeIcon, LikeOutlinedIcon} from './icon';
import {NoteModel, UserModel} from '../types';

type Props = {
  favorites: NoteModel[];
  toggleFavorites: any;
  favoritedBy: UserModel[];
  id: string;
};

const LikeWrapper: React.FC<Props> = ({
  favorites,
  toggleFavorites,
  favoritedBy,
  id,
}) => {
  const [isActive, setActive] = useState(
    favorites?.filter(note => note.id === id).length > 0,
  );

  const onClickHandler = useCallback(() => {
    setActive(!isActive);
    toggleFavorites({variables: {id}});
  }, [id, isActive, toggleFavorites]);

  const getFavoritedByForNote = useCallback(() => {
    return favoritedBy?.map(user => {
      return <Text>{user.username}</Text>;
    });
  }, [favoritedBy]);

  return (
    <TouchableOpacity onPress={onClickHandler}>
      {isActive ? <LikeIcon /> : <LikeOutlinedIcon />}
    </TouchableOpacity>
  );
};
export default LikeWrapper;
