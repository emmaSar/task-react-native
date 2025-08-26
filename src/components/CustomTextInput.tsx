import React, { useMemo } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Colors } from '../config/Colors';
import Text from './Text';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  containerStyle,
  style,
  placeholderTextColor = Colors.gray60,
  ...props
}) => {
  const inputStyle = useMemo(
    () => [styles.input, error && styles.inputError, style],
    [error, style],
  );

  const containerStyleMemo = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle],
  );

  return (
    <View style={containerStyleMemo}>
      {label && (
        <Text type='bodyS' color='gray100' style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        style={inputStyle}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {error && (
        <Text type='bodyS' color='danger' style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.gray0,
    borderWidth: 1,
    borderColor: Colors.gray20,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.gray100,
  },
  inputError: {
    borderColor: Colors.danger,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
});

export default React.memo(CustomTextInput);
