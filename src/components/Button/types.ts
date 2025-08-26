import { Color } from '../../config/Colors';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonShape = 'rounded' | 'square' | 'pill';
export type TextType =
  | 'little'
  | 'bodyS'
  | 'bodyM'
  | 'bodyMRegular'
  | 'subTitle'
  | 'title';

export interface ButtonIcon {
  name: string;
  position?: 'left' | 'right';
  size?: number;
  color?: string;
}

export interface ButtonProps {
  title?: string; // Optional for IconButton
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  icon?: ButtonIcon;
  fullWidth?: boolean;
  style?: any;
  // Text props
  type?: TextType;
  color?: Color;
  // Semantic props for cleaner code
  primary?: boolean;
  secondary?: boolean;
  outline?: boolean;
  ghost?: boolean;
  danger?: boolean;
  success?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  xlarge?: boolean;
  rounded?: boolean;
  square?: boolean;
  pill?: boolean;
}
