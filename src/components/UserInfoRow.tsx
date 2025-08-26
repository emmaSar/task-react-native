import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../config/Colors';
import Text from './Text';

interface UserInfoRowProps {
  label: string;
  value: string | number | undefined;
  isLink?: boolean;
  onPress?: () => void;
  color?: 'primary' | 'gray100';
}

const UserInfoRow: React.FC<UserInfoRowProps> = ({
  label,
  value,
  isLink = false,
  onPress,
  color = 'gray100',
}) => {
  const displayValue = value || 'Not specified';
  const isClickable = isLink && onPress;

  return (
    <View style={styles.infoRow}>
      <Text type='bodyM' color='gray100'>
        {label}:
      </Text>
      {isClickable ? (
        <TouchableOpacity onPress={onPress}>
          <Text type='bodyM' color='primary'>
            {displayValue}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text type='bodyM' color={color}>
          {displayValue}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray05,
  },
});

export default UserInfoRow;
