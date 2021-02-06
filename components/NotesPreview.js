import React, {useContext} from 'react';
import {ScrollView, Image, View, Pressable} from 'react-native';
import {useRoute, useTheme} from '@react-navigation/native';
import {AppContext} from '../util/context/AppProvider';
import S_Text from './S_Text';
import NotesIcon from '../assets/write-notes.png';

export default NotesPreview = (props) => {
  const {children, navigation, fromScreen, contact, item} = props;
  const {lang} = useContext(AppContext);
  const {colors} = useTheme()
  const {params} = useRoute();

  const PADDING = 16;

  const activeNotes = () => {
    if (contact) return contact.notes;
    if (item) return item.notes;
  };

  const notes = activeNotes();

  const displayNotes = () => {
    if (notes === '') {
      return (
        <S_Text color="secondary">
          {`${lang.EMPTY.NO_NOTES_AVAILABLE}\n\n${lang.EMPTY.NO_NOTES_INSTRUCTIONS}`}
        </S_Text>
      );
    }
    return <S_Text>{notes}</S_Text>;
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingHorizontal: PADDING,
          paddingTop: PADDING,
        }}>
        {displayNotes()}
      </ScrollView>
      <Pressable
        onPress={() =>
          navigation.navigate('Notes', {
            ...params,
            fromScreen,
            contact,
            item
          })
        }>
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
