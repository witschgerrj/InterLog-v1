import React, {createContext, useState} from 'react';

export const AppContext = createContext();

export default AppProvider = ({children}) => {
  const [contacts, setContacts] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [theme, setTheme] = useState(null);
  const [groupColors, setGroupColors] = useState([]);
  const [lang, setLang] = useState(null);

  const app_data = {
    lang,
    contacts,
    catalog,
    theme,
    groupColors,
    setLang,
    setContacts,
    setCatalog,
    setTheme,
    setGroupColors,
  };

  return <AppContext.Provider value={app_data}>{children}</AppContext.Provider>;
};
