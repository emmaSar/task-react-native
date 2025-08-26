import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Button from '../components/Button';
import CustomTextInput from '../components/CustomTextInput';
import Header from '../components/Header';
import { Colors } from '../config/Colors';
import {
  EditScreenNavigationProp,
  EditScreenRouteProp,
} from '../navigation/types';
import { useAppDispatch } from '../store/hooks';
import { updateUser } from '../store/userSlice';

interface EditProps {
  navigation: EditScreenNavigationProp;
  route: EditScreenRouteProp;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  age: string;
}

const Edit: React.FC<EditProps> = ({ navigation, route }) => {
  const { user } = route.params;
  const isEditing = user !== null;
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      age: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        age: user.age ? user.age.toString() : '',
      });
    }
  }, [user, reset]);

  const onSubmit = (data: FormData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    const phoneRegex = /^\+?[\d\s\-()]+$/;
    if (!phoneRegex.test(data.phone)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    const userData = {
      ...user,
      id: user?.id || Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      age: data.age ? parseInt(data.age, 10) : undefined,
    };

    dispatch(updateUser(userData));
    navigation.navigate('UserList');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Header
            title={isEditing ? 'Edit User' : 'Add New User'}
            showBackButton={true}
            onBackPress={() => navigation.navigate('UserList')}
          />

          <View style={styles.form}>
            <Controller
              control={control}
              name='name'
              rules={{ required: 'Name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label='Name'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder='Enter full name'
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='email'
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label='Email'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder='Enter email address'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='phone'
              rules={{
                required: 'Phone is required',
                pattern: {
                  value: /^\+?[\d\s\-()]+$/,
                  message: 'Please enter a valid phone number',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label='Phone'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder='Enter phone number'
                  keyboardType='phone-pad'
                  error={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='age'
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  label='Age'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder='Enter age'
                  keyboardType='numeric'
                  error={errors.age?.message}
                />
              )}
            />

            <View style={styles.buttonContainer}>
              <Button
                title='Cancel'
                onPress={handleCancel}
                secondary
                large
                style={styles.cancelButton}
              />
              <Button
                title={isEditing ? 'Update' : 'Save'}
                onPress={handleSubmit(onSubmit)}
                primary
                large
                style={styles.saveButton}
                disabled={!isValid || !isDirty}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray05,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  form: {
    padding: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    marginLeft: 10,
  },
});

export default Edit;
