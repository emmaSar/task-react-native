import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserList from '../screens/UserList';
import Edit from '../screens/Edit';
import Detail from '../screens/Detail';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName='UserList'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='UserList' component={UserList} />
      <Stack.Screen name='Edit' component={Edit} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
