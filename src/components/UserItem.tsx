import React, { useCallback, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../config/Colors';
import { User } from '../store/userSlice';
import Icon from './Icon';
import Text from './Text';

interface UserItemProps {
  user: User;
  onPress: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onPress }) => {
  // Get avatar URL - use profile picture if available, otherwise fallback to initials
  const getAvatarUrl = useCallback(() => {
    // If the user has a picture property, use it
    if (user.picture && user.picture.medium) {
      return user.picture.medium;
    }
    return '';
  }, [user.picture]);

  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  const avatarUrl = useMemo(() => getAvatarUrl(), [getAvatarUrl]);
  const userInitial = useMemo(
    () => user.name.charAt(0).toUpperCase(),
    [user.name],
  );

  return (
    <TouchableOpacity style={styles.userItem} onPress={handlePress}>
      {!user.picture?.medium ? (
        <View style={[styles.avatar, styles.avatarFallback]}>
          <Text type='title' color='gray0'>
            {userInitial}
          </Text>
        </View>
      ) : (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      )}
      <View style={styles.userInfo}>
        <Text type='bodyM' color='gray100'>
          {user.name}
        </Text>
        <Text type='bodyS' color='gray60'>
          {user.email}
        </Text>
        <Text type='bodyS' color='gray70'>
          {user.phone}
        </Text>
      </View>
      <Icon name='chevron-right' size={24} color={Colors.gray20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userItem: {
    backgroundColor: Colors.gray0,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray05,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: Colors.gray05,
    borderWidth: 2,
    borderColor: Colors.gray10,
  },
  userInfo: {
    flex: 1,
  },

  avatarFallback: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(UserItem);
