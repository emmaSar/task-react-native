import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Colors } from '../config/Colors';
import Button from './Button';
import Text from './Text';

interface ErrorScreenProps {
  title?: string;
  message: string;
  onRetry: () => void;
  retryText?: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title = 'Oops! Something went wrong',
  message,
  onRetry,
  retryText = 'Retry',
}) => {
  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.errorContainer}>
        <Text type='title' centered>
          {title}
        </Text>
        <Text type='bodyM' color='gray100' centered style={styles.errorText}>
          {message}
        </Text>
        <Button
          title={retryText}
          onPress={handleRetry}
          primary
          large
          icon={{ name: 'refresh', position: 'left' }}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray05,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    marginBottom: 32,
    color: Colors.gray70,
  },
});

export default React.memo(ErrorScreen);
