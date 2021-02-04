import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {AppContext} from '../../util/context/AppProvider';
import Contacts from '../../screens/contacts/Contacts';
import ViewContact from '../../screens/contacts/ViewContact';
import NewContact from '../../screens/contacts/NewContact';
import Notes from '../../screens/Notes';
import Settings from '../../screens/settings/Settings';
import ContactArchive from '../../screens/settings/ContactArchive';
import ContactColors from '../../screens/settings/ContactColors';

const Stack = createStackNavigator();

export default contacts_stack = () => {
  const {lang} = useContext(AppContext);

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
        component={Contacts}
        options={{title: lang.HEADER.CONTACTS}}/>
      <Stack.Screen 
        name='ViewContact'
        component={ViewContact}
        options={{title: lang.HEADER.VIEW_CONTACT}}/>
      <Stack.Screen 
        name='NewContact'
        component={NewContact}
        options={{title: lang.HEADER.NEW_CONTACT}}/>
      <Stack.Screen 
        name='Notes'
        component={Notes}
        options={{title: lang.HEADER.NOTES}}/>
      <Stack.Screen 
        name='Settings'
        component={Settings}
        options={{title: lang.HEADER.SETTINGS}}/>
      <Stack.Screen 
        name='ContactArchive'
        component={ContactArchive}
        options={{title: lang.HEADER.CONTACT_ARCHIVE}}/>
      <Stack.Screen 
        name='ContactColors'
        component={ContactColors}
        options={{title: lang.HEADER.CONTACT_COLORS}}/>
    </Stack.Navigator>
  );
}