import {NavigatorScreenParams} from '@react-navigation/native';
import {AuthenticationStackParamListType} from '../authentication/types';

export type RootStackParamListType = {
  Authentication: NavigatorScreenParams<AuthenticationStackParamListType>;
  NoteDetails: {id: string};
  RootTabs: undefined;
};
