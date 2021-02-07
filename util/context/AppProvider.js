import React, {createContext, useState} from 'react';
import {PixelRatio, Dimensions} from 'react-native';
import {
  FB_updateContact,
  FB_createContact,
  FB_timestamp,
  FB_archiveContact,
  FB_deleteContact,
  FB_deleteContactFromArchive,
  FB_updateContactColors,
  FB_updateLang,
} from '../google/Firestore';
import 'react-native-get-random-values';
import languages from '../lang/languages';
import {nanoid} from 'nanoid';

export const AppContext = createContext();

export default AppProvider = ({children}) => {
  const [contacts, setContacts] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [theme, setTheme] = useState(null);
  const [contactColors, setContactColors] = useState([]);
  const [langCode, setLangCode] = useState('en_US');
  const [lang, setLang] = useState(languages['en_US']);
  const [contactArchive, setContactArchive] = useState([]);
  const pixelRatio = PixelRatio.getFontScale();
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const getUID = () => {
    return nanoid();
  };

  const updateContacts = (contacts) => {
    contacts.sort((a, b) =>
      a.color > b.color
        ? 1
        : a.color === b.color
        ? a.last_updated < b.last_updated
          ? 1
          : -1
        : -1,
    );
    setContacts(contacts);
  };

  const formattedTime = (seconds) => {
    seconds = FB_timestamp() - seconds;

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return lang.TIME.YEAR_AGO;
    }
    if (days > 0) {
      if (days === 1) return '1 ' + lang.TIME.DAY_AGO;
      return `${days} ${lang.TIME.DAYS_AGO}`;
    }
    if (hours > 0) {
      if (hours === 1) return '1 ' + lang.TIME.HOUR_AGO;
      return `${hours} ${lang.TIME.HOURS_AGO}`;
    }
    if (minutes > 0) {
      if (minutes === 1) return '1 ' + lang.TIME.MINUTE_AGO;
      return `${minutes} ${lang.TIME.MINUTES_AGO}`;
    }
    return lang.TIME.MOMENTS_AGO;
  };

  const app_data = {
    lang,
    langCode,
    contacts,
    catalog,
    theme,
    contactColors,
    pixelRatio,
    deviceWidth,
    deviceHeight,
    contactArchive,
    setLang,
    setLangCode,
    updateContacts,
    setCatalog,
    setTheme,
    setContactColors,
    setContactArchive,
    getUID,
    formattedTime,
    FB_updateContact,
    FB_createContact,
    FB_archiveContact,
    FB_deleteContact,
    FB_deleteContactFromArchive,
    FB_updateContactColors,
    FB_updateLang,
  };

  return <AppContext.Provider value={app_data}>{children}</AppContext.Provider>;
};
