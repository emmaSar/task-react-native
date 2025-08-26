import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../config/Colors';
import Icon from '../Icon';
import { ButtonProps } from './types';

const IconButton: React.FC<ButtonProps> = ({
  icon,
  onPress,
  disabled = false,
  loading = false,
  size = 'medium',
  style,
}) => {
  if (!icon) return null;

  const iconSize =
    icon.size || (size === 'small' ? 16 : size === 'large' ? 24 : 20);
  const iconColor = icon.color || Colors.gray0;

  const handlePress = () => {
    if (!disabled && !loading) onPress();
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} />
      ) : (
        <Icon name={icon.name} size={iconSize} color={iconColor} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;
