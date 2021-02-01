//row for contact
import React, {useLayoutEffect} from 'react';
import {Image, Pressable} from 'react-native';
import Row from '../../components/Row';
import Flex from '../../components/Flex';
import S_Text from '../../components/S_Text';
import BackIcon from '../../assets/back.png';

export default Settings = ({navigation, route: {params}}) => {
  const HEADER_SPACING = 16;

  const options = [
    {name: 'Contact Archive', screen: 'ContactArchive', params: {}},
    {name: 'Contact Colors', screen: 'ContactColors', params: {}},
    {name: 'Themes', screen: 'Themes', params: {}},
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
