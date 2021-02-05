//row for contact
import React, {useLayoutEffect, useContext} from 'react';
import {AppContext} from '../../util/context/AppProvider';
import {Image, Pressable} from 'react-native';
import Row from '../../components/Row';
import Flex from '../../components/Flex';
import S_Text from '../../components/S_Text';
import BackIcon from '../../assets/back.png';

export default Settings = ({navigation, route: {params}}) => {
  const {lang} = useContext(AppContext);
  const HEADER_SPACING = 16;

  const options = [
    {name: lang.HEADER.CONTACT_ARCHIVE, screen: 'ContactArchive'},
    {name: lang.HEADER.CONTACT_COLORS, screen: 'ContactColors'},
    {name: lang.HEADER.THEMES, screen: 'Themes'},
    {name: lang.HEADER.LANGUAGE, screen: 'Language'}
  ];

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

  return options.map((option, index) => (
    <Pressable
      onPress={() => navigation.navigate(option.screen)}
      key={'option' + index}>
      <Row>
        <Flex alignItems="center" style={{height: '100%'}}>
          <S_Text>{option.name}</S_Text>
        </Flex>
      </Row>
    </Pressable>
  ));
};
