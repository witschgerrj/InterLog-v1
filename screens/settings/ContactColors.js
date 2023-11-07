import React, {useLayoutEffect, useState, useContext, useEffect} from 'react';
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
import Banner from '../../components/Banner';

//things to fix. If deleting a color or repeating it, contacts with that
//color do not get reset to #363636 locally

export default ContactColors = ({navigation}) => {
  const {
    contactColors,
    contacts,
    updateContacts,
    setContactColors,
    FB_updateContactColors,
    FB_updateContact,
    FB_timestamp,
    lang,
  } = useContext(AppContext);
  //using a second contactColors state for all the new changes and then can compare with the original.
  const [newContactColors, setNewContactColors] = useState([...contactColors]);
  const [deleting, setDeleting] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [showRainbow, setShowRainbow] = useState(null);
  const [colorToContacts, setColorToContacts] = useState({});
  const [duplicateBanner, setDuplicateBanner] = useState(false);

  const HEADER_SPACING = 16;

  //creates a map with key color and values being contacts associated with the color
  const createColorToContacts = () => {
    let contactCopy = [...contacts];
    let groupedByColor = {};

    contactCopy.map((contact, index) => {
      const color = contact.color;
      const exists = color in groupedByColor;
      if (exists) {
        groupedByColor[color].push({...contact, contactIndex: index});
        return;
      }
      groupedByColor[color] = [{...contact, contactIndex: index}];
    });

    setColorToContacts(groupedByColor);
  };

  const updateColorToContacts = (newColor, oldColor) => {
    let copy = {...colorToContacts};
    copy[newColor] = copy[oldColor];
    delete copy[oldColor];

    setColorToContacts(copy);
  };

  useEffect(() => {
    createColorToContacts();
  }, []);

  const addColor = (color) => {
    setNewContactColors([...newContactColors, color]);
    setShowRainbow(null);
  };

  const editColor = (newColor, oldColorIndex) => {
    let copyColors = [...newContactColors];
    let oldColor = copyColors[oldColorIndex];
    copyColors[oldColorIndex] = newColor;

    updateColorToContacts(newColor, oldColor);
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
    filteredColors = filteredColors.filter((color) => {
      const exists = color in colorMap;
      if (color !== '' && !exists) {
        colorMap[color] = 1;
        return true;
      }
      return false;
    });

    //check if anything has changed
    if (!deepEqual(contactColors, filteredColors)) {
      setContactColors(filteredColors);
      FB_updateContactColors(filteredColors);

      //update associated contact colors in the DB
      let contactsCopy = [...contacts];
      const keys = Object.keys(colorToContacts);

      keys.map((color) => {
        //handle if color gets removed and contacts are assigned the color
        const colorRemoved = !newContactColors.includes(color);

        const contactArr = colorToContacts[color];
        //check value of first index to check if colors are unchanged
        if (!contactArr) return;
        if (!colorRemoved && contactArr[0].color === color) return;

        contactArr.map((contact) => {
          const copy = {...contact};
          delete copy.id;
          delete copy.contactIndex;
          FB_updateContact(
            contact.id,
            {
              ...copy,
              color: colorRemoved ? '#363636' : color,
            },
            false,
          );

          const index = contact.contactIndex;
          contactsCopy[index] = {
            ...contactsCopy[index],
            color: colorRemoved ? '#363636' : color,
          };
        });
      });
      //locally update contacts with new colors
      updateContacts(contactsCopy);
    }
    navigation.goBack();
  };

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
          contactColors={newContactColors}
        />
      ) : (
        <ScrollView>
          {newContactColors.map((color, index) => (
            <ColorRow
              contactColors={newContactColors}
              color={color}
              index={index}
              deleting={deleting}
              setEditIndex={setEditIndex}
              deleteColor={deleteColor}
              setShowRainbow={setShowRainbow}
              updateContactColor={updateContactColor}
              setDuplicateBanner={setDuplicateBanner}
              key={'colorRow' + index}
            />
          ))}
        </ScrollView>
      )}
      {duplicateBanner && (
        <Banner
          text={lang.DUPLICATE_COLOR_ENTRY}
          onPress={() => setDuplicateBanner(false)}
          style={{position: 'absolute', bottom: 0, width: '100%'}}
        />
      )}
    </S_SafeAreaView>
  );
};
