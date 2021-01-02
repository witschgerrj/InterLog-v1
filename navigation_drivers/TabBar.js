import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactsStack from './stacks/ContactsStack';
import CatalogStack from './stacks/CatalogStack';
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
        name='ContactsStack' 
        component={ContactsStack}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <Image source={selected}/>;
            }
            return <Image source={unselected}/>;
          }
        }}/>
      <Tab.Screen 
        name='CatalogStack' 
        component={CatalogStack}
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
