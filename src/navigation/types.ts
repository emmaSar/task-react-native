import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { User } from '../store/userSlice';

export type RootStackParamList = {
  UserList: undefined;
  Edit: {
    user: User | null;
  };
  Detail: {
    user: User;
  };
};

export type UserListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserList'
>;

export type EditScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Edit'
>;

export type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;

export type EditScreenRouteProp = RouteProp<RootStackParamList, 'Edit'>;
export type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
