//row for contact
import React from 'react';
import {Image, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Flex from './Flex';
import Add from '../assets/add.png';
import S_Text from '../components/S_Text';

export default Banner = ({onPress, text, style}) => {
  const {colors} = useTheme();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      style={{height: 80, backgroundColor: colors.link, padding: 16, ...style}}>
      <S_Text color="primary" numberOfLines={2} style={{fontWeight: 'bold', flex: 1}}>
        {text}
      </S_Text>
      <Pressable onPress={onPress} style={{marginLeft: 12}}>
        <Image source={Add} style={{transform: [{rotate: '45deg'}]}} />
      </Pressable>
    </Flex>
  );
};
