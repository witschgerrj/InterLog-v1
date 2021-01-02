import React from 'react';
import {useContext} from 'react';
import {AppContext} from '../../util/context/AppProvider';
import {SafeAreaView} from 'react-native';
import S_Text from '../../components/S_Text.js';

export default Contacts = () => {
  const {contacts} = useContext(AppContext);

  return (
    <SafeAreaView>
      <S_Text></S_Text>
    </SafeAreaView>
  );
};
