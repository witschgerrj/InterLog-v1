import React, {useLayoutEffect, useState, useContext} from 'react';
import {Pressable} from 'react-native';
import {AppContext} from '../../util/context/AppProvider';
import S_SafeAreaView from '../../components/S_SafeAreaView';
import S_Text from '../../components/S_Text';
import Flex from '../../components/Flex';
import ColorRow from './components/ColorRow';
import Back from '../../assets/back.png';
import Delete from '../../assets/delete.png';
import Add from '../../assets/add.png';
import deepEqual from 'deep-equal';
import {ScrollView} from 'react-native-gesture-handler';

export default ContactColors = ({navigation}) => {
  const {
    contactColors,
    setContactColors,
    FB_updateContactColors,
    lang,
  } = useContext(AppContext);
  //using a second contactColors state for all the new changes and then can compare with the original.
  const [newContactColors, setNewContactColors] = useState([...contactColors]);
  const [deleting, setDeleting] = useState(false);

  const HEADER_SPACING = 16;

  const addColor = () => {
    setNewContactColors([...newContactColors, '']);
  };

  const deleteColor = (index) => {
    const copy = [...newContactColors];
    copy.splice(index, 1);
    setNewContactColors(copy);
  };

  const updateContactColor = (color, index) => {
    let copy = [...newContactColors];
    copy[index] = color;
    setNewContactColors(copy);
  };

  const setColorsAndGoBack = () => {
    const filteredColors = [...newContactColors].filter(
      (color) => color !== '',
    );

    if (!deepEqual(contactColors, filteredColors)) {
      setContactColors(filteredColors);
      FB_updateContactColors(filteredColors);
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <HeaderIcon
            source={Back}
            style={{marginLeft: HEADER_SPACING}}
            onPress={() => setColorsAndGoBack()}
          />
        ),
        headerRight: () =>
          !deleting ? (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              style={{width: 80, marginRight: HEADER_SPACING}}>
              <HeaderIcon source={Delete} onPress={() => setDeleting(true)} />
              <HeaderIcon source={Add} onPress={addColor} />
            </Flex>
          ) : (
            <Pressable onPress={() => setDeleting(false)}>
              <S_Text
                color="link"
                style={{
                  marginRight: HEADER_SPACING,
                  fontWeight: 'bold',
                }}>
                {lang.DONE}
              </S_Text>
            </Pressable>
          ),
      },
      [navigation],
    );
  });

  return (
    <S_SafeAreaView>
      <ScrollView>
        {newContactColors.map((color, index) => (
          <ColorRow
            color={color}
            index={index}
            deleting={deleting}
            key={'colorRow' + index}
            deleteColor={deleteColor}
            updateContactColor={updateContactColor}
          />
        ))}
      </ScrollView>
    </S_SafeAreaView>
  );
};
