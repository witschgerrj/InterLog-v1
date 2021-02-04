//row for contact
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styled from 'styled-components';
import Row from './Row';
import Flex from './Flex';

const Circle = styled.view`
  width: 20px;
  height: 20px;
  borderRadius: 50%;
  border: 1px solid ${(props) => props.color};
  backgroundColor: ${(props) => props.fill ? props.color : ''};
`;

export default RowSelection = ({onPress}) => {
  const [fill, setFill] = useState(false);

  const {colors} = useTheme();
  return (
    <Pressable
      onPress={() => {
        setFill(!fill);
        onPress(!fill);
      }}>
      <Row>
        <Flex justifyContent="space-between" alignItems="center">
          {children}
          <Circle color={colors.text} fill={fill} />
        </Flex>
      </Row>
    </Pressable>
  );
};

HeaderIcon.defaultProps = {
  onPress: () => {},
};
