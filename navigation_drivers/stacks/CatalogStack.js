import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {AppContext} from '../../util/context/AppProvider';
import Catalog from '../../screens/catalog/Catalog';
import ViewItem from '../../screens/catalog/ViewItem';
import Notes from '../../screens/Notes';

const Stack = createStackNavigator();

export default CatalogStack = () => {
  const {lang} = useContext(AppContext);

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
        options={{title: lang.HEADER.CATALOG}}/>
      <Stack.Screen 
        name='ViewItem'
        component={ViewItem}
        options={{title: lang.HEADER.VIEW_ITEM}}/>
      <Stack.Screen 
        name='Notes'
        component={Notes}
        options={{title: lang.HEADER.NOTES}}/>
    </Stack.Navigator>
  );
}