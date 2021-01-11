import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Contacts from '../../screens/contacts/Contacts';
import ContactView from '../../screens/contacts/ContactView';
import Notes from '../../screens/Notes';

const Stack = createStackNavigator();

export default contacts_stack = () => {
  return (
    <Stack.Navigator 
      initialRouteName={'Contacts'}
      screenOptions={{
        headerTitleStyle: {
          fontSize: 22,
        },
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen 
        name='Contacts'
        component={Contacts}
        options={{title: 'Contacts'}}/>
      <Stack.Screen 
        name='ContactView'
        component={ContactView}
        options={{title: 'View Contact'}}/>
      <Stack.Screen 
      name='Notes'
      component={Notes}
      options={{title: 'Notes'}}/>
    </Stack.Navigator>
  );
}