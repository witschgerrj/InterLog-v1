import React, {useContext} from 'react';
import {AppContext} from '../../../util/context/AppProvider';
import {Pressable, Image, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styled from 'styled-components';
import Flex from '../../../components/Flex';
import Add from '../../../assets/add.png';

const Color = styled.View`
  backgroundColor: ${(props) => props.color};
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  borderRadius: 4px;
  marginBottom: 16px;
`;

const Custom = styled.View`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  border: ${(props) => props.borderColor} dashed 5px;
  borderRadius: 4px;
  marginBottom: 16px;
`;

export default ColorRow = ({
  addEmpty,
  addColor,
  editColor,
  showRainbow,
  editIndex,
}) => {
  const {deviceWidth} = useContext(AppContext);
  const {colors} = useTheme();
  const MARGIN = 16;
  const PADDING = 16;
  const BOX_SIZE = (deviceWidth - MARGIN * 5) / 4;

  const colorList = [
    '#969696',
    '#363636',
    '#FFFFFF',
    '#FFB4B4',
    '#FF7878',
    '#FF3C3C',
    '#FF0000',
    '#FFDCB4',
    '#FFC378',
    '#FFAA3C',
    '#FF9100',
    '#FFFAB4',
    '#FFFA78',
    '#FFFA4B',
    '#FFFA00',
    '#B4FFB4',
    '#78FF78',
    '#4BFF4B',
    '#00FF00',
    '#B4FFFF',
    '#78FFFF',
    '#4BFFFF',
    '#00FFFF',
    '#C8C8FF',
    '#8282FF',
    '#3C3CFF',
    '#0000FF',
    '#DCB4FF',
    '#C378FF',
    '#AA3CFF',
    '#9100FF',
    '#FFB4D7',
    '#FF78BE',
    '#FF3CA5',
    '#FF008C',
  ];

  return (
    <ScrollView
      style={{
        paddingTop: PADDING,
        marginBottom: MARGIN,
        backgroundColor: colors.background,
      }}>
      <Flex flexWrap="wrap" justifyContent="space-evenly">
        <Pressable onPress={() => showRainbow === 'add' ? addEmpty() : editColor('', editIndex)}>
          <Custom borderColor={colors.secondary} size={BOX_SIZE}>
            <Flex
              alignItems="center"
              justifyContent="space-evenly"
              style={{flex: 1}}>
              <Image source={Add} style={{tintColor: colors.secondary}} />
            </Flex>
          </Custom>
        </Pressable>
        {colorList.map((color, index) => (
          <Pressable
            onPress={() =>
              showRainbow === 'add' ? addColor(color) : editColor(color, editIndex)
            }
            key={'rainbow' + index}>
            <Color size={BOX_SIZE} color={color} />
          </Pressable>
        ))}
      </Flex>
    </ScrollView>
  );
};
