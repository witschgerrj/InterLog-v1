//row for contact
import React, {useLayoutEffect, useContext, useState, useRef} from 'react';
import {AppContext} from '../../util/context/AppProvider';
import {Image, Pressable} from 'react-native';
import languages, {langMap} from '../../util/lang/languages';
import RowSelection from '../../components/RowSelection';
import S_Text from '../../components/S_Text';
import BackIcon from '../../assets/back.png';

export default Settings = ({navigation}) => {
  const {langCode, setLangCode, setLang, FB_updateLang} = useContext(
    AppContext,
  );
  const originalCode = useRef(langCode);
  const HEADER_SPACING = 16;

  const updateLang = (option) => {
    setLangCode(option);
    setLang(languages[option]);
  };

  const saveAndBack = () => {
    if (originalCode !== langCode) {
      FB_updateLang(langCode);
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <Pressable onPress={() => saveAndBack()}>
            <Image source={BackIcon} style={{marginLeft: HEADER_SPACING}} />
          </Pressable>
        ),
      },
      [navigation],
    );
  });

  return Object.keys(langMap).map((key, index) => {
    const option = langMap[key];
    return (
      <RowSelection
        onPress={updateLang}
        option={option}
        selected={option === langCode}
        key={'langOption' + index}>
        <S_Text>{key}</S_Text>
      </RowSelection>
    );
  });
};
