import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ImageBackground, Pressable} from 'react-native';
import Flex from '../../../components/Flex';
import S_Text from '../../../components/S_Text';

export default Item = ({item, itemIndex, size, navigation}) => {
  const {name, source} = item;
  const {colors} = useTheme();
  const PADDING = 8;

  const navigateToViewItem = () => {
    navigation.navigate('ViewItem', {
      itemIndex,
      item,
    });
  }

  return (
    <Pressable onPress={() => navigateToViewItem()}>
      <ImageBackground
        source={source}
        style={{
          width: size,
          height: size,
          padding: PADDING,
          marginRight: PADDING,
          marginTop: PADDING, 
          borderRadius: 4,
          backgroundColor: colors.border,
        }}>
        <Flex
          alignItems="center"
          justifyContent="space-evenly"
          style={{flex: 1}}>
          {!source && (
            <S_Text numberOfLines={3} textAlign="center" style={{fontWeight: 'bold'}}>
              {name}
            </S_Text>
          )}
        </Flex>
      </ImageBackground>
    </Pressable>
  );
};
