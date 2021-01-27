import React from 'react';
import {Pressable} from 'react-native';
import {useContext} from 'react';
import {AppContext} from '../../util/context/AppProvider';
import {View} from 'react-native';
import Contact from './components/Contact';
import S_Text from '../../components/S_Text';
import S_SafeAreaView from '../../components/S_SafeAreaView';

const navigateContactView = ({navigation, contactIndex , contact}) => {
  navigation.navigate('ContactView', {
    contactIndex,
    contact,
  });
};

export default Contacts = ({navigation}) => {
  const {contacts} = useContext(AppContext);

  return (
    <S_SafeAreaView>
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <Pressable
            onPress={() =>
              navigateContactView({
                navigation,
                contactIndex: index,
                contact,
              })
            }
            key={'contact' + index}>
            <Contact name={contact.name} color={contact.color} />
          </Pressable>
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