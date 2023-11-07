import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Loading from './screens/login/Loading';
import dark from './themes/Dark';
import AppProvider, {AppContext} from './util/context/AppProvider';

const isLoggedIn = true;

export default RenderFlow = () => {

  useEffect(() => {
    //check for login
  }, []);

  return (
    <NavigationContainer theme={dark}>
      {isLoggedIn ? (
        <AppProvider>
          <Loading />
        </AppProvider>
      ) : (
        <>
          {
            //navigate to landing
          }
        </>
      )}
    </NavigationContainer>
  );
};
