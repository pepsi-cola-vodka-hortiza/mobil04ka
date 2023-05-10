import {NavigatorScreenParams} from '@react-navigation/native';
import {AuthenticationStackParamListType} from '../authentication/types';

export type RootStackParamListType = {
  Authentication: NavigatorScreenParams<AuthenticationStackParamListType>;
  CreateNote: {id?: string};
  NoteDetails: {id: string};
  RootTabs: undefined;
};
