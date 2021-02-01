//row for contact
import React, {useState, useLayoutEffect, useContext} from 'react';
import {ActionSheetIOS, Image, Pressable} from 'react-native';
import {AppContext} from '../../util/context/AppProvider';
import {useTheme} from '@react-navigation/native';
import styled from 'styled-components';
import Row from '../../components/Row';
import Flex from '../../components/Flex';
import S_Text from '../../components/S_Text';
import HeaderIcon from '../../components/HeaderIcon';
import Download from '../../assets/download.png';
import BackIcon from '../../assets/back.png';
import Delete from '../../assets/delete.png';

const Color = styled.View`
  backgroundColor: ${(props) => props.color};
  height: 53px;
  width: 10px;
  borderRadius: 4px;
  marginRight: 16px;
`;

export default ContactArchive = ({navigation}) => {
  const {
    contactArchive,
    setContactArchive,
    contacts,
    updateContacts,
    formattedTime,
    FB_deleteContactFromArchive,
    FB_createContact,
  } = useContext(AppContext);

  const [deleting, setDeleting] = useState(false);

  const {colors} = useTheme();

  const HEADER_SPACING = 16;

  const restoreContact = (contact, index) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Restore', 'Cancel'],
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          //creating copies to dereference
          const id = contact.id;

          FB_deleteContactFromArchive(id);
          FB_createContact(id, contact);

          let contactsCopy = [...contacts, contact];
          updateContacts(contactsCopy);

          let contactArchiveCopy = [...contactArchive];
          contactArchiveCopy.splice(index, 1);
          setContactArchive(contactArchiveCopy);
        }
      },
    );
  };

  const confirmDelete = (id, index) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Delete', 'Cancel'],
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          FB_deleteContactFromArchive(id);

          let contactArchiveCopy = [...contactArchive];
          contactArchiveCopy.splice(index, 1);
          setContactArchive(contactArchiveCopy);
        }
      },
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <HeaderIcon
            source={BackIcon}
            style={{marginLeft: HEADER_SPACING}}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: () => (
          <HeaderIcon
            source={Delete}
            style={{marginRight: HEADER_SPACING}}
            onPress={() => setDeleting(!deleting)}
          />
        ),
      },
      [navigation],
    );
  });

  return contactArchive.map((contact, index) => {
    const {name, last_updated, color, id} = contact;
    const timestamp = formattedTime(last_updated);
    return (
      <Pressable onPress={() => {}} key={'archiveContact' + index}>
        <Row>
          <Flex justifyContent="space-between">
            <Pressable
              onPress={() => restoreContact(contact, index)}
              style={{flex: 1}}>
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
            {!deleting ? (
              <Flex alignItems="center">
                <Image
                  source={Download}
                  style={{tintColor: colors.text}}></Image>
              </Flex>
            ) : (
              <Pressable onPress={() => confirmDelete(id, index)}>
                <Flex alignItems="center" style={{height: '100%'}}>
                  <S_Text color="error" fontWeight="bold">
                    Delete
                  </S_Text>
                </Flex>
              </Pressable>
            )}
          </Flex>
        </Row>
      </Pressable>
    );
  });
};
