//row for contact
import React, {useLayoutEffect, useContext} from 'react';
import {AppContext} from '../../util/context/AppProvider';
import {Image, Pressable} from 'react-native';
import Row from '../../components/Row';
import Flex from '../../components/Flex';
import S_Text from '../../components/S_Text';
import BackIcon from '../../assets/back.png';
import ContactIcon from '../../assets/contact-no-border.png';
import Palette from '../../assets/paint-palette.png';
import Themes from '../../assets/themes.png';
import Globe from '../../assets/globe.png';
import Arrow from '../../assets/arrow.png';

export default Settings = ({navigation, route: {params}}) => {
  const {lang} = useContext(AppContext);
  const HEADER_SPACING = 16;
  const MARGIN = 16;

  const options = [
    {name: lang.HEADER.CONTACT_ARCHIVE, screen: 'ContactArchive', icon: ContactIcon},
    {name: lang.HEADER.CONTACT_COLORS, screen: 'ContactColors', icon: Palette},
    {name: lang.HEADER.THEMES, screen: 'Themes', icon: Themes},
    {name: lang.HEADER.LANGUAGE, screen: 'Language', icon: Globe}
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
        <Flex justifyContent='space-between' alignItems='center' style={{flex: 1}}>
          <Flex alignItems="center">
            <Image source={option.icon} style={{marginRight: MARGIN}}/>
            <S_Text>{option.name}</S_Text>
          </Flex>
          <Image source={Arrow}/>
        </Flex>
      </Row>
    </Pressable>
  ));
};
