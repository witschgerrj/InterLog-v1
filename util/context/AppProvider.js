import React, {createContext, useState} from 'react';
import {PixelRatio, Dimensions} from 'react-native';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

export const AppContext = createContext();

export default AppProvider = ({children}) => {
  const [contacts, setContacts] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [theme, setTheme] = useState(null);
  const [groupColors, setGroupColors] = useState([]);
  const [lang, setLang] = useState(null);
  const pixelRatio = PixelRatio.getFontScale();
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const getUID = () => {
    return nanoid();
  }

  const app_data = {
    lang,
    contacts,
    catalog,
    theme,
    groupColors,
    pixelRatio,
    deviceWidth,
    deviceHeight,
    setLang,
    setContacts,
    setCatalog,
    setTheme,
    setGroupColors,
    getUID
  };

  return <AppContext.Provider value={app_data}>{children}</AppContext.Provider>;
};
