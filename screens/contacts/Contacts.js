import React, {useLayoutEffect, useState, useContext} from 'react';
import {View, Image, Pressable} from 'react-native';
import {AppContext} from '../../util/context/AppProvider';
import Contact from './components/Contact';
import S_Text from '../../components/S_Text';
import S_SafeAreaView from '../../components/S_SafeAreaView';
import Flex from '../../components/Flex';
import HeaderIcon from '../../components/HeaderIcon';
import Add from '../../assets/add.png';
import Delete from '../../assets/delete.png';
import Cog from '../../assets/cog.png';

export default Contacts = ({navigation, route: {params}}) => {
  const {contacts} = params;
  const {
    FB_archiveContact,
    FB_deleteContact,
    updateContacts,
    setContactArchive,
    contactArchive,
  } = useContext(AppContext);

  const [archiving, setArchiving] = useState(false);
  
  const defaultContact = {
    name: '',
    phone: '',
    email: '',
    notes: '',
    color: '#363636',
  };

  const HEADER_SPACING = 16;

  const archiveContact = (contact, contactIndex) => {
    const id = contact.id;
    delete contact.id;

    FB_archiveContact(id, contact);
    FB_deleteContact(id);

    contactArchive.push(contact);
    setContactArchive(contactArchive);

    contacts.splice(contactIndex, 1);
    updateContacts(contacts);

    navigation.setParams({
      contacts: contacts
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <HeaderIcon
            source={Cog}
            style={{marginLeft: HEADER_SPACING}}
            onPress={() => navigation.navigate('Settings')}
          />
        ),
        headerRight: () =>
          !archiving ? (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              style={{width: 80, marginRight: HEADER_SPACING}}>
              <HeaderIcon source={Delete} onPress={() => setArchiving(true)} />
              <HeaderIcon
                source={Add}
                onPress={() =>
                  navigation.navigate('NewContact', {
                    contact: defaultContact,
                  })
                }
              />
            </Flex>
          ) : (
            <Pressable onPress={() => setArchiving(false)}>
              <S_Text
                color="link"
                style={{
                  marginRight: HEADER_SPACING,
                  fontWeight: 'bold',
                }}>
                Done
              </S_Text>
            </Pressable>
          ),
      },
      [navigation],
    );
  });

  return (
    <S_SafeAreaView>
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <Contact
            contact={{...contact}}
            contactIndex={index}
            archiving={archiving}
            archiveContact={archiveContact}
            navigation={navigation}
            key={'contact' + index}
          />
        ))
      ) : (
        <View style={{padding: 48}}>
          <S_Text textAlign="center" color="secondary">
            No contacts available. {'\n\n'} To add a new client, press the plus
            icon at the top right of the screen.
          </S_Text>
        </View>
      )}
    </S_SafeAreaView>
  );
};
