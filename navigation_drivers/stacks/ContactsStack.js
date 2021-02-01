import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {useContext} from 'react';
import {AppContext} from '../../util/context/AppProvider';
import Contacts from '../../screens/contacts/Contacts';
import ViewContact from '../../screens/contacts/ViewContact';
import NewContact from '../../screens/contacts/NewContact';
import Notes from '../../screens/Notes';
import Settings from '../../screens/settings/Settings';
import ContactArchive from '../../screens/settings/ContactArchive';

const Stack = createStackNavigator();

export default contacts_stack = () => {

  const {contacts} = useContext(AppContext);

  return (
    <Stack.Navigator 
      initialRouteName={'Contacts'}
      screenOptions={{
        headerTitleStyle: {
          fontSize: 22,
        },
        headerBackTitleVisible: false,
        headerLeft: null,
      }}>
      <Stack.Screen 
        name='Contacts'
        component={Contacts}/>
      <Stack.Screen 
        name='ViewContact'
        component={ViewContact}
        options={{title: 'View Contact'}}/>
      <Stack.Screen 
        name='NewContact'
        component={NewContact}
        options={{title: 'New Contact'}}/>
      <Stack.Screen 
        name='Notes'
        component={Notes}/>
      <Stack.Screen 
        name='Settings'
        component={Settings}/>
      <Stack.Screen 
        name='ContactArchive'
        component={ContactArchive}
        options={{title: 'Contact Archive'}}/>
    </Stack.Navigator>
  );
}