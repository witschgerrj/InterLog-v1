//row for contact
import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components';
import S_Text from '../../../components/S_Text';
import Row from '../../../components/Row';
import Info from '../../../assets/info.png';
import Flex from '../../../components/Flex';
import Padding from '../../../components/Padding';

const Color = styled.View`
  backgroundColor: ${(props) => props.color};
  height: 53px;
  width: 10px;
  borderRadius: 4px;
  marginRight: 16px;
`;

export default Contact = ({name, updated, color}) => {
  return (
    <Row>
      <Flex justifyContent="space-between">
        <Flex style={{width: '80%'}}>
          <Color color={color} />
          <Flex flexDirection="column">
              <S_Text>{name}</S_Text>
              <Padding pt='10'>
                <S_Text color='secondary'>{updated}</S_Text>
              </Padding>
          </Flex>
        </Flex>
        <Image source={Info} style={{marginTop: 16}}/>
      </Flex>
    </Row>
  );
};

Contact.defaultProps = {
  name: 'Name not found',
  updated: 'Time not found',
  color: '#363636',
};
