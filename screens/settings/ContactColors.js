import React, {useLayoutEffect, useState, useContext, createRef} from 'react';
import {Pressable, ScrollView} from 'react-native';
import {AppContext} from '../../util/context/AppProvider';
import S_SafeAreaView from '../../components/S_SafeAreaView';
import S_Text from '../../components/S_Text';
import Flex from '../../components/Flex';
import ColorRow from './components/ColorRow';
import Rainbow from './components/Rainbow';
import Back from '../../assets/back.png';
import Delete from '../../assets/delete.png';
import Add from '../../assets/add.png';
import deepEqual from 'deep-equal';

export default ContactColors = ({navigation}) => {
  const {
    contactColors,
    contacts,
    updateContacts,
    setContactColors,
    FB_updateContactColors,
    lang,
  } = useContext(AppContext);
  //using a second contactColors state for all the new changes and then can compare with the original.
  const [newContactColors, setNewContactColors] = useState([...contactColors]);
  const [deleting, setDeleting] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [showRainbow, setShowRainbow] = useState(null);

  const HEADER_SPACING = 16;

  const addColor = (color) => {
    setNewContactColors([...newContactColors, color]);
    setShowRainbow(null);
  };

  const editColor = (color, index) => {
    let copyColors = [...newContactColors]
    copyColors[index] = color;
    setNewContactColors(copyColors);
    setShowRainbow(null);
  };

  const addEmpty = () => {
    setNewContactColors([...newContactColors, '']);
    setShowRainbow(null);
  };

  const deleteColor = (index) => {
    let copy = [...newContactColors];
    copy.splice(index, 1);
    setNewContactColors(copy);
  };

  const updateContactColor = (color, index) => {
    let copy = [...newContactColors];
    copy[index] = color;
    setNewContactColors(copy);
  };

  const setColorsAndGoBack = () => {
    //checking for empty colors and duplicates
    const colorMap = {};
    let filteredColors = [...newContactColors];
    filteredColors = filteredColors.filter(color => {
      const exists = color in colorMap
      if (color !== '' && !exists) {
        colorMap[color] = 1;
        return true
      }
      return false
    })

    if (!deepEqual(contactColors, filteredColors)) {
      setContactColors(filteredColors);
      FB_updateContactColors(filteredColors);
    }
    navigation.goBack();
  };

  //don't allow duplicate colors to be added
  //add functionality to click on color pallette icon to change current color
  //iterate through contacts to update new colors appropriately.

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () =>
          !showRainbow && (
            <HeaderIcon
              source={Back}
              style={{marginLeft: HEADER_SPACING}}
              onPress={() => setColorsAndGoBack()}
            />
          ),
        headerRight: () =>
          !deleting && !showRainbow ? (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              style={{width: 80, marginRight: HEADER_SPACING}}>
              <HeaderIcon source={Delete} onPress={() => setDeleting(true)} />
              <HeaderIcon source={Add} onPress={() => setShowRainbow('add')} />
            </Flex>
          ) : (
            <Pressable
              onPress={() => {
                setDeleting(false);
                setShowRainbow(null);
              }}>
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
      {showRainbow ? (
        <Rainbow
          editIndex={editIndex}
          addEmpty={addEmpty}
          editColor={editColor}
          addColor={addColor}
          showRainbow={showRainbow}
        />
      ) : (
        <ScrollView>
          {newContactColors.map((color, index) => (
            <ColorRow
              color={color}
              index={index}
              deleting={deleting}
              key={'colorRow' + index}
              setEditIndex={setEditIndex}
              deleteColor={deleteColor}
              setShowRainbow={setShowRainbow}
              updateContactColor={updateContactColor}
            />
          ))}
        </ScrollView>
      )}
    </S_SafeAreaView>
  );
};
