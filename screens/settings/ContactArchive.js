//row for contact
import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import {ActionSheetIOS, ScrollView, Image, Pressable} from 'react-native';
// import {AppContext} from '../../util/context/AppProvider';
import Row from '../../components/Row';
import Flex from '../../components/Flex';
import S_Text from '../../components/S_Text';
import BackIcon from '../../assets/back.png';

export default ContactArchive = ({navigation}) => {
  // const {addContactArchive} = useContext(AppContext);

  const HEADER_SPACING = 16;

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={BackIcon} style={{marginLeft: HEADER_SPACING}} />
          </Pressable>
        ),
      },
      [navigation],
    );
  });

  return (
    contactArchive.map((contact, index) => (
      <Pressable onPress={() => {}}>
        <Row>

        </Row>
      </Pressable>
    ))
  );
};
