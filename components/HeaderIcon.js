//row for contact
import React from 'react';
import { Image, Pressable } from 'react-native';
import Flex from './Flex';

export default HeaderIcon = ({
  onPress,
  icon,
  style,
  children,
}) => {
  return (
    <Pressable onPress={() => onPress()}>
      <Flex justifyContent='space-evenly' alignItems='center' style={{height: '100%'}}>
        <Image source={icon}/>
      </Flex>
    </Pressable>
  );
};

HeaderIcon.defaultProps = {
  onPress: () => {},
}
