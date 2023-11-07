//row for contact
import React from 'react';
import {Image, Pressable} from 'react-native';
import Flex from './Flex';

export default HeaderIcon = ({onPress, source, style}) => {
  return (
    <Pressable onPress={() => onPress()}>
      <Flex
        justifyContent="space-evenly"
        alignItems="center"
        style={{height: '100%', ...style}}>
        <Image source={source} />
      </Flex>
    </Pressable>
  );
};

HeaderIcon.defaultProps = {
  onPress: () => {},
};
