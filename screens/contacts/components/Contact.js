//row for contact
import React, {useContext} from 'react';
import {AppContext} from '../../../util/context/AppProvider';
import {Image, Pressable} from 'react-native';
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

export default Contact = (props) => {
  const {
    navigation,
    archiving,
    contactIndex,
    archiveContact,
    contact,
  } = props;

  const { name, last_updated, color } = contact;
  const {formattedTime, lang} = useContext(AppContext);
  const timestamp = formattedTime(last_updated);

  const navigateViewContact = () => {
    navigation.navigate('ViewContact', {
      contactIndex,
      contact,
    });
  };

  return (
    <Row>
      <Flex justifyContent="space-between">
        <Pressable onPress={() => navigateViewContact()} style={{flex: 1}}>
          <Flex>
            <Color color={color} />
            <Flex flexDirection="column">
              <S_Text>{name}</S_Text>
              <Padding pt="10">
                <S_Text color="secondary">{timestamp}</S_Text>
              </Padding>
            </Flex>
          </Flex>
        </Pressable>
        {!archiving ? (
          <Flex alignItems="center">
            <Image source={Info}/>
          </Flex>
        ) : (
          <Pressable onPress={() => archiveContact(contact, contactIndex)}>
            <Flex alignItems="center" style={{height: '100%'}}>
              <S_Text color="error" fontWeight="bold">
                {lang.ARCHIVE}
              </S_Text>
            </Flex>
          </Pressable>
        )}
      </Flex>
    </Row>
  );
};

Contact.defaultProps = {
  name: 'Name not found',
  updated: 'Time not found',
  color: '#363636',
};
