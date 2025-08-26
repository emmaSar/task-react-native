import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../config/Colors';
import Icon from './Icon';
import Text from './Text';

const { height: screenHeight } = Dimensions.get('window');

interface BottomSheetItem {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
  style?: 'default' | 'danger' | 'warning';
  disabled?: boolean;
}

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  items: BottomSheetItem[];
  title?: string;
  showCancel?: boolean;
  cancelText?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  items,
  title,
  showCancel = true,
  cancelText = 'Cancel',
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='slide'
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHandle} />

          {title && (
            <Text type='title' centered>
              {title}
            </Text>
          )}

          {items.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.bottomSheetItem,
                item.disabled && styles.disabledItem,
              ]}
              onPress={item.disabled ? undefined : item.onPress}
              disabled={item.disabled}
            >
              <View style={styles.itemContent}>
                <Icon
                  name={item.icon}
                  size={20}
                  color={item.disabled ? Colors.gray60 : Colors.gray100}
                />
                <Text
                  type='bodyM'
                  color={item.disabled ? 'gray0' : 'gray100'}
                  style={styles.itemText}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {showCancel && (
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text type='bodyM'>{cancelText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: Colors.gray0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 34,
    maxHeight: screenHeight * 0.4,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  bottomSheetHandle: {
    width: 36,
    height: 4,
    backgroundColor: Colors.gray10,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  bottomSheetItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray05,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 12,
  },
  disabledItem: {
    opacity: 0.4,
  },
  cancelButton: {
    marginTop: 24,
    paddingVertical: 18,
    backgroundColor: Colors.gray05,
    borderRadius: 14,
    alignItems: 'center',
  },
});

export default BottomSheet;
