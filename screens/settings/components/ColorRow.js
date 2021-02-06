import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../../util/context/AppProvider';
import {Pressable, Image, View} from 'react-native';
import styled from 'styled-components';
import S_Text from '../../../components/S_Text';
import Input from '../../../components/Input';
import Flex from '../../../components/Flex';
import Paint from '../../../assets/paint.png';
import {useTheme} from '@react-navigation/native';

const Color = styled.View`
  backgroundColor: ${(props) => props.color};
  height: 53px;
  width: 83px;
  borderRadius: 4px;
  marginRight: 16px;
`;

export default ColorRow = ({
  color,
  index,
  deleting,
  updateContactColor,
  deleteColor,
  setShowRainbow
}) => {
  const {lang} = useContext(AppContext);
  const {colors} = useTheme();
  const [textColor, setTextColor] = useState(color ? color.substring(1) : '');
  const [boxColor, setBoxColor] = useState(color ? color : '#363636');

  //update state on delete or change of color
  useEffect(() => {
    setTextColor(color ? color.substring(1) : '');
    setBoxColor(color ? color : '#363636');
  }, [color]);

  //update text and then validate if its a valid hex color
  const updateColorOption = (newColor) => {
    setTextColor(newColor);
    validateColor(newColor);
  };

  const validateColor = (newColor) => {
    const hex = `#${newColor}`;
    const regex = /^#([0-9A-F]{3}){1,2}$/i;

    if (regex.test(hex)) {
      updateContactColor(hex, index);
      setBoxColor(hex);
      return;
    }
    setBoxColor('#363636');
  };

  return (
    <Row>
      <Flex alignItems="center">
        <Pressable onPress={() => setShowRainbow(true)}>
          <Color color={boxColor} key={'color' + index} />
        </Pressable>
        <S_Text>#</S_Text>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          style={{flex: 1, height: '100%'}}>
          <Input
            value={textColor}
            autoCapitalize="characters"
            maxLength={6}
            editable={!deleting}
            onChange={(newColor) => updateColorOption(newColor)}
            style={{flex: 3, height: '100%'}}
          />
          {deleting ? (
            <Pressable onPress={() => deleteColor(index)}>
              <S_Text color="error">{lang.REMOVE}</S_Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => setShowRainbow(true)}
              style={{flex: 1}}>
              <Flex
                justifyContent="flex-end"
                alignItems="center"
                style={{flex: 1}}>
                <Image
                  source={Paint}
                  style={{
                    tintColor: boxColor,
                    resizeMode: 'contain',
                    height: 22,
                    width: 22,
                  }}
                />
              </Flex>
            </Pressable>
          )}
        </Flex>
      </Flex>
    </Row>
  );
};
