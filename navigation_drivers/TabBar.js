import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import contactsStack from './stacks/ContactsStack';
import catalogStack from './stacks/CatalogStack';
import unselected from '../assets/unselected.png';
import contactsUnselected from '../assets/contacts-unselected.png';
import contactsSelected from '../assets/contacts-selected.png';
import catalogUnselected from '../assets/catalog-unselected.png';
import catalogSelected from '../assets/catalog-selected.png';

const Tab = createBottomTabNavigator();

export default TabBar = () => {
  return (
  <Tab.Navigator 
  initialRouteName= 'contacts'
  tabBarOptions={{
    showLabel: false,
    showIcon: true,
    activeTintColor: '#fff',
    keyboardHidesTabBar: false,
  }}>
      <Tab.Screen 
        name='contactsStack' 
        component={contactsStack}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <Image source={contactsSelected}/>;
            }
            return <Image source={contactsUnselected}/>;
          }
        }}/>
      <Tab.Screen 
        name='catalogStack' 
        component={catalogStack}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <Image source={catalogSelected}/>;
            }
            return <Image source={catalogUnselected}/>;
          }
        }}/>
    </Tab.Navigator>
  )
}
