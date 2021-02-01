import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Loading from './screens/login/Loading';
import dark from './themes/Dark';
import AppProvider from './util/context/AppProvider';

const isLoggedIn = true;

export default RenderFlow = () => {
  useEffect(() => {
    //check for login
  }, []);

  return (
    <AppProvider>
      <NavigationContainer theme={dark}>
        {isLoggedIn ? (
            <Loading />
        ) : (
          <>
            {
              //navigate to landing
            }
          </>
        )}
      </NavigationContainer>
    </AppProvider>
  );
};
