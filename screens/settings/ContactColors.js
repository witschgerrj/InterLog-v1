import React, {useLayoutEffect, useState, useContext} from 'react';
import {Pressable} from 'react-native';
import {AppContext} from '../../util/context/AppProvider';
import styled from 'styled-components';
import S_SafeAreaView from '../../components/S_SafeAreaView';
import S_Text from '../../components/S_Text';
import Input from '../../components/Input';
import Flex from '../../components/Flex';
import Back from '../../assets/back.png';
import Delete from '../../assets/delete.png';
import Add from '../../assets/add.png';

const Color = styled.View`
  backgroundColor: ${(props) => props.color};
  height: 53px;
  width: 83px;
  borderRadius: 4px;
  marginRight: 16px;
`;

export default ContactColors = ({navigation}) => {
  const {contactColors} = useContext(AppContext);

  const HEADER_SPACING = 16;

  const [deleting, setDeleting] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <HeaderIcon
            source={Back}
            style={{marginLeft: HEADER_SPACING}}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: () =>
          !deleting ? (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              style={{width: 80, marginRight: HEADER_SPACING}}>
              <HeaderIcon source={Delete} onPress={() => setDeleting(true)} />
              <HeaderIcon source={Add} onPress={() => {}} />
            </Flex>
          ) : (
            <Pressable onPress={() => setDeleting(false)}>
              <S_Text
                color="link"
                style={{
                  marginRight: HEADER_SPACING,
                  fontWeight: 'bold',
                }}>
                Done
              </S_Text>
            </Pressable>
          ),
      },
      [navigation],
    );
  });

  return (
    <S_SafeAreaView>
      {contactColors.map((color, index) => (
        <ColorRow
          color={color}
          index={index}
          deleting={deleting}
          key={'colorRow' + index}
        />
      ))}
    </S_SafeAreaView>
  );
};

const ColorRow = ({color, index, deleting}) => {
  const [colorOption, setColorOption] = useState(color.substring(1));

  const validateColor = (option) => {
    const hex = `#${option}`;
    const regex = /^#([0-9A-F]{3}){1,2}$/i;

    if (regex.test(hex)) {
      return hex;
    }
    return '#363636';
  };

  return (
    <Row>
      <Flex alignItems="center">
        <Color color={validateColor(colorOption)} key={'color' + index} />
        <S_Text>#</S_Text>
        <Flex justifyContent="space-between" style={{flex: 1}}>
          <Input
            value={colorOption}
            autoCapitalize='characters'
            maxLength={6}
            onChange={setColorOption}
            style={{flex: 1, height: '100%'}}
          />
          {deleting && <S_Text color="error">Delete</S_Text>}
        </Flex>
      </Flex>
    </Row>
  );
};