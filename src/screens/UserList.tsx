import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ErrorScreen from '../components/ErrorScreen';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import UserItem from '../components/UserItem';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers } from '../store/operations';
import { User } from '../store/userSlice';

import { Colors } from '../config/Colors';
import { UserListScreenNavigationProp } from '../navigation/types';

interface UserListProps {
  navigation: UserListScreenNavigationProp;
}

const UserList: React.FC<UserListProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(state => state.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers(10));
    }
  }, [dispatch, users.length]);

  const onRefresh = () => {
    dispatch(fetchUsers(10));
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <UserItem
      user={item}
      onPress={() => navigation.navigate('Detail', { user: item })}
    />
  );

  if (loading && users.length === 0) {
    return <LoadingScreen message='Loading users...' />;
  }

  if (error) {
    return <ErrorScreen message={error} onRetry={onRefresh} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title='User List' />
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray05,
  },
  list: {
    flex: 1,
  },
});

export default UserList;
