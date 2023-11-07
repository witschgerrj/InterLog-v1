//row for contact
import React, {useContext} from 'react';
import {ScrollView, Pressable} from 'react-native';
import Flex from '../../../components/Flex';
import {AppContext} from '../../../util/context/AppProvider';
import styled from 'styled-components';
import {useTheme} from '@react-navigation/native';

const ColorBox = styled.View`
  backgroundColor: ${(props) => props.color};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  borderRadius: 4px;
`;

export default ColorPicker = ({activeColor, setColor, BOX_SIZE}) => {
  const {deviceWidth, contactColors} = useContext(AppContext);
  const {colors} = useTheme();

  const PADDING = 16;
  const SIZE = (deviceWidth - PADDING * 5) / 4;
  const MAX_HEIGHT = BOX_SIZE * 4 + PADDING * 5;

  return (
    <ScrollView
      style={{
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.background,
        maxHeight: MAX_HEIGHT,
      }}>
      <Flex
        flexWrap="wrap-reverse"
        style={{paddingTop: PADDING}}>
        {contactColors.map((color, index) => (
          <Pressable
            onPress={() => setColor(color)}
            key={'ColorPicker' + index}>
            <ColorBox
              size={SIZE}
              color={color}
              style={{
                marginTop: PADDING,
                marginLeft: PADDING,
                borderWidth: 4,
                borderStyle: 'solid',
                borderColor: activeColor === color ? colors.text : color,
              }}
            />
          </Pressable>
        ))}
      </Flex>
    </ScrollView>
  );
};

Contact.defaultProps = {
  name: 'Name not found',
  updated: 'Time not found',
  color: '#363636',
};
