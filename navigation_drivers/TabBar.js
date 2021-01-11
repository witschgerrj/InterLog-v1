import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import contactsStack from './stacks/ContactsStack';
import catalogStack from './stacks/CatalogStack';
import unselected from '../assets/unselected.png';
import selected from '../assets/selected.png';

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
              return <Image source={selected}/>;
            }
            return <Image source={unselected}/>;
          }
        }}/>
      <Tab.Screen 
        name='catalogStack' 
        component={catalogStack}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <Image source={selected}/>;
            }
            return <Image source={unselected}/>;
          }
        }}/>
    </Tab.Navigator>
  )
}
