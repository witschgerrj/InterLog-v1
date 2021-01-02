import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Catalog from '../../screens/catalog/Catalog';
// import CatalogAdd from '../screens/catalogAdd';
// import CatalogCategory from '../screens/catalogCategory';
// import CatalogItemNotes from '../screens/catalogItemNotes';
// import CatalogItemView from '../screens/catalogItemView';

const Stack = createStackNavigator();

export default CatalogStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName={'Catalog'}
      screenOptions={{
        headerTitleStyle: {
          fontSize: 22,
        },
      }}>
      <Stack.Screen 
        name='Catalog'
        component={Catalog}
        options={{title: 'Catalog'}}/>
    </Stack.Navigator>
  );
}