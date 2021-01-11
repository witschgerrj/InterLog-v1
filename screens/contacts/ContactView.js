import React, {useContext, createContext, useState, useLayoutEffect} from 'react';
import {View, Pressable, ScrollView, Image} from 'react-native';
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

export const ContactContext = createContext();

export default Contacts = ({navigation, route: {params}}) => {
  const {
    contacts,
    setContacts,
    deviceWidth,
    deviceHeight,
    groupColors,
  } = useContext(AppContext);
  const {contactIndex, original, contactDetails} = params;

  const [color, setColor] = useState(contactDetails.color);
  const [name, setName] = useState(contactDetails.name);
  const [email, setEmail] = useState(contactDetails.email);
  const [phone, setPhone] = useState(contactDetails.phone);
  const [showColors, setShowColors] = useState(false);

  const PADDING = 16;
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

  }

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.navigate('Contacts')}>
            <Image source={BackIcon} style={{marginLeft: PADDING}} />
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
            placeholder="First Last"
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
      <NotesPreview navigation={navigation}>
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
