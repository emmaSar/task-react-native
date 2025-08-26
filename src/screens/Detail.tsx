import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import BottomSheet from '../components/BottomSheet';
import Header from '../components/Header';
import Text from '../components/Text';
import UserInfoRow from '../components/UserInfoRow';
import { Colors } from '../config/Colors';
import {
  DetailScreenNavigationProp,
  DetailScreenRouteProp,
} from '../navigation/types';
import { useAppDispatch } from '../store/hooks';
import { deleteUser } from '../store/userSlice';

interface DetailProps {
  navigation: DetailScreenNavigationProp;
  route: DetailScreenRouteProp;
}

const Detail: React.FC<DetailProps> = ({ navigation, route }) => {
  const { user } = route.params;
  const dispatch = useAppDispatch();
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleEdit = () => {
    setShowBottomSheet(false);
    navigation.navigate('Edit', { user });
  };

  const handleDelete = () => {
    setShowBottomSheet(false);
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${user.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Delete from Redux store
            dispatch(deleteUser(user.id));
            Alert.alert('Success', 'User deleted successfully!', [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]);
          },
        },
      ],
    );
  };

  const openBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
  };

  const handleCall = () => {
    const phoneNumber = user.phone.replace(/\s/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${user.email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title='User Details'
        showBackButton={true}
        showMenuButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={openBottomSheet}
      />

      <View style={styles.content}>
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            {user.picture && user.picture.medium ? (
              <Image
                source={{ uri: user.picture.medium }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarText}>
                {user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase()}
              </Text>
            )}
          </View>

          <Text type='title' centered>
            {user.name}
          </Text>

          <View style={styles.infoContainer}>
            <UserInfoRow
              label='Email'
              value={user.email}
              isLink={true}
              onPress={handleEmail}
            />
            <UserInfoRow
              label='Phone'
              value={user.phone}
              isLink={true}
              onPress={handleCall}
            />
            <UserInfoRow
              label='Age'
              value={user.age ? `${user.age} years` : undefined}
              color='primary'
            />
          </View>
        </View>
      </View>

      {/* Bottom Sheet Component */}
      <BottomSheet
        visible={showBottomSheet}
        onClose={closeBottomSheet}
        title='User Actions'
        items={[
          {
            id: 'edit',
            title: 'Edit User',
            icon: 'edit',
            onPress: handleEdit,
          },
          {
            id: 'delete',
            title: 'Delete User',
            icon: 'delete',
            onPress: handleDelete,
            style: 'danger',
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray05,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  userCard: {
    backgroundColor: Colors.gray0,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gray0,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    width: '100%',
  },
});

export default Detail;
