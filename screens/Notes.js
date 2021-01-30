//row for contact
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {ScrollView, Image, Pressable} from 'react-native';
import Input from '../components/Input';
import {useRoute} from '@react-navigation/native';
import BackIcon from '../assets/back.png';

export default Notes = ({navigation}) => {
  const {params} = useRoute();
  const {contact} = params;

  const [notes, setNotes] = useState(contact.notes);

  useEffect(() => {
    navigation.setParams({
      contact: {
        ...contact,
        notes: notes,
      },
    });
  }, [notes]);

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.navigate('ViewContact', {...params})}>
            <Image source={BackIcon} style={{marginLeft: PADDING}} />
          </Pressable>
        ),
      },
      [navigation],
    );
  });

  const PADDING = 16;

  return (
    <ScrollView style={{flex: 1, padding: PADDING}}>
      <Input value={notes} onChange={setNotes} multiline />
    </ScrollView>
  );
};
