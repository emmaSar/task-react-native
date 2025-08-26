import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../config/Colors';

export type IconType =
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Ionicons'
  | 'FontAwesome'
  | 'FontAwesome5';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  type?: IconType;
  style?: any;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = Colors.black,
  type = 'MaterialIcons',
  style,
}) => {
  const iconStyle = useMemo(
    () => [styles.icon, { color }, style],
    [color, style],
  );

  const renderIcon = useMemo(() => {
    switch (type) {
      case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons name={name} size={size} style={iconStyle} />
        );
      case 'Ionicons':
        return <Ionicons name={name} size={size} style={iconStyle} />;
      case 'FontAwesome':
        return <FontAwesome name={name} size={size} style={iconStyle} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={name} size={size} style={iconStyle} />;
      default:
        return <MaterialIcons name={name} size={size} style={iconStyle} />;
    }
  }, [type, name, size, iconStyle]);

  return renderIcon;
};

const styles = StyleSheet.create({
  icon: {
    // Default icon styles
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});

export default React.memo(Icon);
