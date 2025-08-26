import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../config/Colors';
import Icon from './Icon';
import Text from './Text';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  rightButton?: {
    title: string;
    onPress: () => void;
  };
  onBackPress?: () => void;
  onMenuPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showMenuButton = false,
  onBackPress,
  onMenuPress,
}) => {
  const handleBackPress = useCallback(() => {
    onBackPress?.();
  }, [onBackPress]);

  const handleMenuPress = useCallback(() => {
    onMenuPress?.();
  }, [onMenuPress]);

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name='arrow-back' size={24} color={Colors.gray100} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text type='title'>{title}</Text>

      {showMenuButton ? (
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Icon name='more-vert' size={24} color={Colors.gray100} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.gray0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray10,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  placeholder: {
    width: 60,
  },
  menuButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default React.memo(Header);
