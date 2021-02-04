import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Catalog from '../../screens/catalog/Catalog';
import {AppContext} from '../../util/context/AppProvider';

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
    </Stack.Navigator>
  );
}