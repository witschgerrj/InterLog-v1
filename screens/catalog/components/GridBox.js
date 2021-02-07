import {useTheme} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {ImageBackground, Pressable} from 'react-native';
import Flex from '../../../components/Flex';
import S_Text from '../../../components/S_Text';

export default Catalog = ({size, source, name, style}) => {
  const {colors} = useTheme();
  const PADDING = 16;

  return (
    <ImageBackground
      source={source}
      style={{
        width: size,
        height: size,
        padding: PADDING,
        ...style,
        backgroundColor: colors.border,
      }}>
      <Flex alignItems="center" justifyContent="space-evenly" style={{flex: 1}}>
        {!source && <S_Text numberOfLines={3} textAlign='center'>{name}</S_Text>}
      </Flex>
    </ImageBackground>
  );
};
