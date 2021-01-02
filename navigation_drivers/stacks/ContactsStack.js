import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Contacts from '../../screens/contacts/Contacts';

const Stack = createStackNavigator();

export default contacts_stack = () => {
  return (
    <Stack.Navigator 
      initialRouteName={'Contacts'}
      screenOptions={{
        headerTitleStyle: {
          fontSize: 22,
        },
      }}>
      <Stack.Screen 
        name='Contacts'
        component={Contacts}
        options={{title: 'Contacts'}}/>
    </Stack.Navigator>
  );
}