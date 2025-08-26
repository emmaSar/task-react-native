/* eslint-disable react-native/no-unused-styles */
import React, { useMemo } from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle as RNTextStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { Color, Colors } from '../config/Colors';

export type TextType =
  | 'little'
  | 'bodyS'
  | 'bodyM'
  | 'bodyMRegular'
  | 'subTitle'
  | 'title';

export interface ITextProps extends RNTextProps {
  type?: TextType;
  color?: Color;
  bold?: boolean;
  normal?: boolean;
  centered?: boolean;
}

export const FontFamily = {
  Poppins: 'Poppins',
} as const;

type FontWeight = '400' | '500' | '600' | '700';

const FontWeightMap: Record<FontWeight, string> = {
  '400': 'Regular',
  '500': 'Medium',
  '600': 'SemiBold',
  '700': 'Bold',
};

export const providePlatformTextStyle = (
  styles: StyleProp<RNTextStyle>,
): RNTextStyle => {
  const flatten = StyleSheet.flatten(styles);

  if (
    flatten.fontFamily &&
    !Object.values(FontFamily).includes(
      flatten.fontFamily as keyof typeof FontFamily,
    )
  ) {
    throw new Error(
      `Unknown font family provided. Provided: ${
        flatten.fontFamily
      }, available: [${Object.values(FontFamily)}]`,
    );
  }

  if (flatten.fontWeight) {
    const weight = flatten.fontWeight.toString();
    if (weight in FontWeightMap) {
      flatten.fontFamily = `${flatten.fontFamily}-${
        FontWeightMap[weight as FontWeight]
      }`;
    } else if (flatten.fontWeight === 'normal') {
      flatten.fontFamily = `${flatten.fontFamily}-Regular`;
    } else if (flatten.fontWeight === 'bold') {
      flatten.fontFamily = `${flatten.fontFamily}-Bold`;
    }
    delete flatten.fontWeight;
  } else {
    // Default to Regular if no weight specified
    flatten.fontFamily = `${flatten.fontFamily}-Regular`;
  }

  return flatten;
};

const Text: React.FC<ITextProps> = ({
  type = 'bodyS',
  color = 'gray100',
  style,
  bold,
  normal,
  centered,
  children,
  ...rest
}) => {
  const platformStyle = useMemo(() => {
    return providePlatformTextStyle([
      TextStyle[type],
      { color: Colors[color] },
      bold && TextStyle.bold,
      normal && TextStyle.normal,
      centered && TextStyle.centered,
      style,
    ]);
  }, [type, color, bold, normal, centered, style]);

  return (
    <RNText style={platformStyle} {...rest}>
      {children}
    </RNText>
  );
};

export const TextStyle = StyleSheet.create({
  centered: {
    textAlign: 'center',
  },
  normal: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  little: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16,
    fontFamily: FontFamily.Poppins,
  },
  bodyS: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    fontFamily: FontFamily.Poppins,
  },
  bodyM: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
    fontFamily: FontFamily.Poppins,
  },
  bodyMRegular: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: FontFamily.Poppins,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    fontFamily: FontFamily.Poppins,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 32,
    fontFamily: FontFamily.Poppins,
  },
});

export default React.memo(Text);
