import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../config/Colors';
import Icon from '../Icon';
import Text from '../Text';
import { ButtonProps } from './types';

const TextButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  color,
  type = 'bodyM',
}) => {
  const handlePress = () => {
    if (!disabled && !loading) onPress();
  };

  const getBackgroundColor = () => {
    if (disabled) return Colors.gray60;
    switch (variant) {
      case 'primary':
        return Colors.primary;
      case 'secondary':
        return Colors.secondary;
      case 'outline':
        return 'transparent';
      default:
        return Colors.primary;
    }
  };

  const iconSize =
    icon?.size || (size === 'small' ? 16 : size === 'large' ? 24 : 20);
  const iconColor = variant === 'outline' ? Colors.primary : Colors.gray0;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
        },
        fullWidth && styles.fullWidth,
        size === 'small'
          ? styles.small
          : size === 'large'
          ? styles.large
          : styles.medium,
        style,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={Colors.gray0} />
      ) : (
        <>
          {icon && icon.position !== 'right' && (
            <Icon name={icon.name} size={iconSize} color={iconColor} />
          )}
          <Text
            type={type}
            color={color || (variant === 'outline' ? 'primary' : 'gray0')}
            style={
              icon && icon.position !== 'right' ? styles.iconText : undefined
            }
          >
            {title}
          </Text>
          {icon && icon.position === 'right' && (
            <Icon name={icon.name} size={iconSize} color={iconColor} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  fullWidth: {
    width: '100%',
  },
  iconText: {
    marginLeft: 8,
  },
  small: { paddingVertical: 6 },
  medium: { paddingVertical: 10 },
  large: { paddingVertical: 14 },
});

export default TextButton;
