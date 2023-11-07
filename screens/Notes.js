//row for contact
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {ScrollView, Image, Pressable} from 'react-native';
import Input from '../components/Input';
import {useRoute} from '@react-navigation/native'
import BackIcon from '../assets/back.png';

export default Notes = ({navigation}) => {
  const {params} = useRoute();
  const {contact, item, fromScreen} = params;

  const PADDING = 16;

  const activeNotes = () => {
    if (contact) return contact.notes;
    if (item) return item.notes;
  }
  const [notes, setNotes] = useState(activeNotes());

  const navigateBack = () => {
    return (
      <Pressable
        onPress={() => navigation.navigate(fromScreen, {...params})}>
        <Image source={BackIcon} style={{marginLeft: PADDING}} />
      </Pressable>
    )
  }

  const updateNotes = () => {
    if (contact) {
      navigation.setParams({
        contact: {
          ...contact,
          notes: notes,
        },
      });
    }
    if (item) {
      navigation.setParams({
        item: {
          ...item,
          notes: notes,
        },
      });
    }
  }

  useEffect(() => {
    updateNotes()
  }, [notes]);

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          navigateBack()
        ),
      },
      [navigation],
    );
  });

  return (
    <ScrollView style={{flex: 1, padding: PADDING}}>
      <Input value={notes} onChange={setNotes} multiline style={{ minHeight: '100%' }}/>
    </ScrollView>
  );
};
