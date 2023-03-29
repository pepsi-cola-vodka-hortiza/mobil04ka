export type UserModel = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  notes: NoteModel[];
  favorites: NoteModel[];
};

export type NoteModel = {
  id: string;
  content: string;
  author: UserModel;
  createdAt: string;
  updatedAt: string;
  favoriteCount: number;
  favoritedBy: UserModel[];
};
