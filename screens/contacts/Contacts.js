import React, {useLayoutEffect, useState} from 'react';
import {View, Image, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Contact from './components/Contact';
import S_Text from '../../components/S_Text';
import S_SafeAreaView from '../../components/S_SafeAreaView';
import Flex from '../../components/Flex';
import HeaderIcon from '../../components/HeaderIcon';
import Add from '../../assets/add.png';
import Delete from '../../assets/delete.png';

export default Contacts = ({navigation, route: {params}}) => {
  const {contacts} = params;

  const [archiving, setArchiving] = useState(false);
  const defaultContact = {
    name: '',
    phone: '',
    email: '',
    notes: '',
    color: '#363636',
  };

  const HEADER_SPACING = 16;

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerRight: () =>
          !archiving ? (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              style={{width: 80, marginRight: HEADER_SPACING}}>
              <HeaderIcon
                icon={Add}
                onPress={() =>
                  navigation.navigate('NewContact', {
                    contact: defaultContact,
                  })
                }
              />
              <HeaderIcon icon={Delete} onPress={() => setArchiving(true)} />
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
            name={contact.name}
            color={contact.color}
            last_updated={contact.last_updated}
            contact={contact}
            contactIndex={index}
            archiving={archiving}
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
