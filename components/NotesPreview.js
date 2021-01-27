import React, {useContext, useEffect} from 'react';
import {ScrollView, Image, View, Pressable} from 'react-native';
import S_Text from './S_Text';
import NotesIcon from '../assets/write-notes.png';
import {useRoute, useTheme} from '@react-navigation/native';

export default NotesPreview = ({children, navigation}) => {
  const {colors} = useTheme();
  const {params} = useRoute();
  const {contact} = params;

  const PADDING = 16;

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingHorizontal: PADDING,
          paddingTop: PADDING,
        }}>
        <S_Text>{contact.notes}</S_Text>
      </ScrollView>
      <Pressable onPress={() => navigation.navigate('Notes', {
        ...params
      })}>
        <Image
          source={NotesIcon}
          style={{
            position: 'absolute',
            right: PADDING * 2,
            bottom: PADDING * 2,
          }}
        />
      </Pressable>
      {children}
    </View>
  );
};
