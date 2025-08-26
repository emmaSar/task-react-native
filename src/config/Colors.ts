export type Color =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'gray0'
  | 'gray05'
  | 'gray10'
  | 'gray20'
  | 'gray60'
  | 'gray70'
  | 'gray100'
  | 'black'
  | 'overlay'
  | 'outline';

export type IColor = {
  [key in Color]: string;
};

export const Colors: IColor = {
  primary: '#F49300',
  secondary: '#1C8E00',
  danger: '#FF3B30',
  gray0: '#FFFFFF',
  gray05: '#F3F4F6',
  gray10: '#E5E7EB',
  gray20: '#D1D5DB',
  gray60: '#9CA3AF',
  gray70: '#6B7280',
  gray100: '#111827',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  outline: 'transparent',
};
