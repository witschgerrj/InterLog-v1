//row for contact
import React from 'react';
import {Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styled from 'styled-components';
import Row from './Row';
import Flex from './Flex';

const Circle = styled.View`
  width: 20px;
  height: 20px;
  borderRadius: 10px;
  border: 1px solid ${(props) => props.color};
  backgroundColor: ${(props) => props.fill};
`;

export default RowSelection = ({onPress, selected, option, children}) => {
  const {colors} = useTheme();

  return (
    <Pressable
      onPress={() => {
        onPress(option);
      }}>
      <Row>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          style={{height: '100%'}}>
          {children}
          <Circle
            color={colors.text}
            fill={selected ? colors.text : 'transparent'}
          />
        </Flex>
      </Row>
    </Pressable>
  );
};

RowSelection.defaultProps = {
  onPress: () => {},
  selected: false,
};
