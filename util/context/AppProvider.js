import React, {createContext, useState} from 'react';
import {PixelRatio, Dimensions} from 'react-native';
import {
  FB_updateContact,
  FB_createContact,
  FB_timestamp,
  FB_archiveContact,
  FB_deleteContact,
} from '../google/Firestore';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';

export const AppContext = createContext();

export default AppProvider = ({children}) => {
  const [contacts, setContacts] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [theme, setTheme] = useState(null);
  const [groupColors, setGroupColors] = useState([]);
  const [lang, setLang] = useState(null);
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
      return 'Over a year ago';
    }
    if (days > 0) {
      if (days === 1) return '1 day ago';
      return `${days} days ago`;
    }
    if (hours > 0) {
      if (hours === 1) return '1 hour ago';
      return `${hours} hours ago`;
    }
    if (minutes > 0) {
      if (minutes === 1) return '1 minute ago';
      return `${minutes} minutes ago`;
    }
    return 'moments ago';
  };

  const app_data = {
    lang,
    contacts,
    catalog,
    theme,
    groupColors,
    pixelRatio,
    deviceWidth,
    deviceHeight,
    contactArchive,
    setLang,
    updateContacts,
    setCatalog,
    setTheme,
    setGroupColors,
    setContactArchive,
    getUID,
    formattedTime,
    FB_updateContact,
    FB_createContact,
    FB_archiveContact,
    FB_deleteContact,
  };

  return <AppContext.Provider value={app_data}>{children}</AppContext.Provider>;
};
