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
import deepEqual from 'deep-equal';

const Color = styled.View`
  backgroundColor: ${(props) => props.color};
  height: 53px;
  width: 83px;
  borderRadius: 4px;
  marginRight: 16px;
`;

export default ContactColors = ({navigation}) => {
  const {contactColors, setContactColors, FB_updateContactColors} = useContext(AppContext);
  //using a second contactColors state for all the new changes and then can compare with the original.
  const [updatedContactColors, setUpdatedContactColors] = useState([...contactColors]);
  const [deleting, setDeleting] = useState(false);
  
  const HEADER_SPACING = 16;

  const addNewContactColor = (color, index) => {
    let copyUpdatedContactColors = [...updatedContactColors];
    copyUpdatedContactColors[index] = color;
    setUpdatedContactColors(copyUpdatedContactColors);
  }

  const updateColorsAndGoBack = () => {
    if (!deepEqual(contactColors, updatedContactColors)) {
      setContactColors(updatedContactColors);
      FB_updateContactColors(updatedContactColors);
    }
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <HeaderIcon
            source={Back}
            style={{marginLeft: HEADER_SPACING}}
            onPress={() => updateColorsAndGoBack()}
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
      {updatedContactColors.map((color, index) => (
        <ColorRow
          color={color}
          index={index}
          deleting={deleting}
          key={'colorRow' + index}
          addNewContactColor={addNewContactColor}
        />
      ))}
    </S_SafeAreaView>
  );
};

const ColorRow = ({color, index, deleting, addNewContactColor}) => {
  const [textColor, setTextColor] = useState(color.substring(1));
  const [boxColor, setBoxColor] = useState(color);

  //update text and then validate if its a valid hex color
  const updateColorOption = (newColor) => {
    setTextColor(newColor);
    validateColor(newColor);
  }

  const validateColor = (newColor) => {
    const hex = `#${newColor}`;
    const regex = /^#([0-9A-F]{3}){1,2}$/i;

    if (regex.test(hex)) {
      addNewContactColor(hex, index);
      setBoxColor(hex);
      return;
    }
    setBoxColor('#363636');
  };

  return (
    <Row>
      <Flex alignItems="center">
        <Color color={boxColor} key={'color'+index} />
        <S_Text>#</S_Text>
        <Flex justifyContent="space-between" style={{flex: 1}}>
          <Input
            value={textColor}
            autoCapitalize='characters'
            maxLength={6}
            onChange={newColor => updateColorOption(newColor)}
            style={{flex: 1, height: '100%'}}
          />
          {deleting && <S_Text color="error">Delete</S_Text>}
        </Flex>
      </Flex>
    </Row>
  );
};