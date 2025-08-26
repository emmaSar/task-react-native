import React, { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Color, Colors } from '../config/Colors';
import Icon from './Icon';
import Text from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: {
    name: string;
    position?: 'left' | 'right';
    size?: number;
  };
  fullWidth?: boolean;
  style?: any;
  // Text props
  type?: 'little' | 'bodyS' | 'bodyM' | 'bodyMRegular' | 'subTitle' | 'title';
  color?: Color;
  // Semantic props for cleaner code
  primary?: boolean;
  secondary?: boolean;
  outline?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant,
  size,
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  // Text props
  type = 'bodyM',
  color = 'gray0',
  // Semantic props
  primary,
  secondary,
  outline,
  small,
  medium,
  large,
  ...rest
}) => {
  // Determine the variant based on semantic props
  let finalVariant = variant;
  if (primary) finalVariant = 'primary';
  else if (secondary) finalVariant = 'secondary';
  else if (outline) finalVariant = 'outline';
  else if (!finalVariant) finalVariant = 'primary';

  // Determine the size based on semantic props
  let finalSize = size;
  if (small) finalSize = 'small';
  else if (medium) finalSize = 'medium';
  else if (large) finalSize = 'large';
  else if (!finalSize) finalSize = 'medium';

  // Determine text type based on button size
  let textType = type;
  if (finalSize === 'small') textType = 'bodyS';
  else if (finalSize === 'large') textType = 'subTitle';
  else textType = 'bodyM';

  // Determine text color based on variant
  let textColor = color;
  if (finalVariant === 'outline') textColor = 'primary';
  else textColor = 'gray0';

  // Get background color based on variant
  const getBackgroundColor = () => {
    if (disabled) return Colors.gray60;

    switch (finalVariant) {
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

  const buttonStyle = [
    styles.button,
    styles[finalSize],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    {
      backgroundColor: getBackgroundColor(),
      borderWidth: finalVariant === 'outline' ? 1 : 0,
      borderColor: finalVariant === 'outline' ? Colors.primary : 'transparent',
    },
    style,
  ];

  const iconSize =
    icon?.size ||
    (finalSize === 'small' ? 16 : finalSize === 'large' ? 24 : 20);
  const iconColor = finalVariant === 'outline' ? Colors.primary : Colors.gray0;

  const handlePress = useCallback(() => {
    if (!disabled && !loading) {
      onPress();
    }
  }, [onPress, disabled, loading]);

  const renderContent = useCallback(() => {
    if (icon) {
      const iconElement = (
        <Icon name={icon.name} size={iconSize} color={iconColor} />
      );

      if (icon.position === 'right') {
        return (
          <>
            <Text type={textType} color={textColor}>
              {title}
            </Text>
            {iconElement}
          </>
        );
      } else {
        return (
          <>
            {iconElement}
            <Text type={textType} color={textColor} style={styles.iconText}>
              {title}
            </Text>
          </>
        );
      }
    }

    return (
      <Text type={textType} color={textColor}>
        {title}
      </Text>
    );
  }, [icon, iconSize, iconColor, textType, textColor, title]);

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? <ActivityIndicator color={Colors.gray0} /> : renderContent()}
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
  disabled: {
    opacity: 0.5,
  },
  iconText: {
    marginLeft: 8,
  },
});

export default React.memo(Button);
