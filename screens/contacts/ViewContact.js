import React, {useContext, useState, useLayoutEffect} from 'react';
import {View, Pressable, Image} from 'react-native';
import {AppContext} from '../../util/context/AppProvider';
import Flex from '../../components/Flex';
import styled from 'styled-components';
import Input from '../../components/Input';
import S_Text from '../../components/S_Text';
import ColorPicker from './components/ColorPicker';
import S_SafeAreaView from '../../components/S_SafeAreaView';
import NotesPreview from '../../components/NotesPreview';
import BackIcon from '../../assets/back.png';

const ColorIndicator = styled.View`
  backgroundColor: ${(props) => props.color};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  borderRadius: 4px;
  marginLeft: 16px;
`;

export default Contacts = ({navigation, route: {params}}) => {
  const {contacts, updateContacts, deviceWidth, FB_updateContact} = useContext(
    AppContext,
  );
  const {
    contactIndex,
    contact,
    contact: {notes},
  } = params;

  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const [color, setColor] = useState(contact.color);
  const [original, setOriginal] = useState(contact);
  const [showColors, setShowColors] = useState(false);

  const PADDING = 16;
  const HEADER_SPACING = 16;
  const ROW_HEIGHT = 80;
  const BOX_SIZE = 64;
  const MARGIN_BOTTOM = 6;
  const nameWidth = deviceWidth - PADDING * 3 - BOX_SIZE;

  const hideColors = () => {
    if (showColors) {
      setShowColors(false);
    }
  };

  const validateChanges = () => {
    if (color !== original.color) return true;
    if (name !== original.name) return true;
    if (email !== original.email) return true;
    if (phone !== original.phone) return true;
    if (notes !== original.notes) return true;

    return false;
  };

  const updateAndNavigate = () => {
    const validate = validateChanges();
    if (validate) {
      //creating copies to dereference

      const id = original.id;
      const editedContact = {color, name, email, phone, notes};

      //update contact in firebase using the doc id
      FB_updateContact(id, editedContact);
      //update contact within context
      let contactsCopy = [...contacts];
      contactsCopy.splice(contactIndex, 1);
      contactsCopy.push({...editedContact, id});
      updateContacts(contactsCopy);
    }
    navigation.navigate('Contacts', {
      contacts,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <Pressable onPress={() => updateAndNavigate()}>
            <Image source={BackIcon} style={{marginLeft: HEADER_SPACING}} />
          </Pressable>
        ),
      },
      [navigation],
    );
  });

  return (
    <S_SafeAreaView>
      <Flex
        justifyContent="space-between"
        style={{height: ROW_HEIGHT, padding: PADDING}}>
        <View>
          <S_Text
            color="link"
            style={{fontWeight: 'bold', marginBottom: MARGIN_BOTTOM}}>
            Name
          </S_Text>
          <Input
            value={name}
            placeholder="First and Last"
            autoCapitalize="words"
            onChange={setName}
            style={{width: nameWidth}}
            maxLength={50}
            onFocus={() => hideColors()}
          />
        </View>
        <Pressable onPress={() => setShowColors(!showColors)}>
          <ColorIndicator color={color} size={BOX_SIZE} />
        </Pressable>
      </Flex>
      <View style={{height: ROW_HEIGHT, padding: PADDING}}>
        <S_Text
          color="link"
          style={{fontWeight: 'bold', marginBottom: MARGIN_BOTTOM}}>
          Email
        </S_Text>
        <Input
          value={email}
          placeholder="email@address.com"
          onChange={setEmail}
          maxLength={80}
          onFocus={() => hideColors()}
        />
      </View>
      <View
        style={{
          height: ROW_HEIGHT,
          padding: PADDING,
          marginBottom: ROW_HEIGHT * 1.5,
        }}>
        <S_Text
          color="link"
          style={{fontWeight: 'bold', marginBottom: MARGIN_BOTTOM}}>
          Phone
        </S_Text>
        <Input
          value={phone}
          placeholder="(999) 999-9999"
          onChange={setPhone}
          maxLength={50}
          onFocus={() => hideColors()}
        />
      </View>
      <NotesPreview
        navigation={navigation}
        contact={contact}
        fromScreen="ViewContact">
        {showColors ? (
          <ColorPicker
            setColor={setColor}
            activeColor={color}
            BOX_SIZE={BOX_SIZE}
          />
        ) : null}
      </NotesPreview>
    </S_SafeAreaView>
  );
};
