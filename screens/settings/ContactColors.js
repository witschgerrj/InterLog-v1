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

export default ContactColors = ({navigation}) => {
  const {contactColors, setContactColors, FB_updateContactColors} = useContext(AppContext);
  //using a second contactColors state for all the new changes and then can compare with the original.
  const [updatedContactColors, setUpdatedContactColors] = useState([...contactColors]);
  const [deleting, setDeleting] = useState(false);
  
  const HEADER_SPACING = 16;

  const addNewContactColor = () => {
    setUpdatedContactColors([...updatedContactColors, ''])
  }

  const deleteContactColor = (index) => {
    let contactColors = [...updatedContactColors];
    contactColors.splice(index, 1);
    setUpdatedContactColors(contactColors);
  }

  const updateContactColor = (color, index) => {
    let copyUpdatedContactColors = [...updatedContactColors];
    copyUpdatedContactColors[index] = color;
    setUpdatedContactColors(copyUpdatedContactColors);
  }

  const updateColorsAndGoBack = () => {
    const filteredColors = [...updatedContactColors].filter(color => color !== '');
    
    if (!deepEqual(contactColors, filteredColors)) {
      setContactColors(filteredColors);
      FB_updateContactColors(filteredColors);
    }
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <HeaderIcon
            source={Back}
            style={{marginLeft: HEADER_SPACING}}
            onPress={() => updateColorsAndGoBack()}
          />
        ),
        headerRight: () =>
          !deleting ? (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              style={{width: 80, marginRight: HEADER_SPACING}}>
              <HeaderIcon source={Delete} onPress={() => setDeleting(true)} />
              <HeaderIcon source={Add} onPress={addNewContactColor} />
            </Flex>
          ) : (
            <Pressable onPress={() => setDeleting(false)}>
              <S_Text
                color="link"
                style={{
                  marginRight: HEADER_SPACING,
                  fontWeight: 'bold',
                }}>
                Done
              </S_Text>
            </Pressable>
          ),
      },
      [navigation],
    );
  });

  return (
    <S_SafeAreaView>
      {updatedContactColors.map((color, index) => (
        <ColorRow
          color={color}
          index={index}
          deleting={deleting}
          key={'colorRow' + index}
          deleteContactColor={deleteContactColor}
          updateContactColor={updateContactColor}
        />
      ))}
    </S_SafeAreaView>
  );
};