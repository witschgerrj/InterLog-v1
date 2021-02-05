import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../util/context/AppProvider';
import {FB_getContactArchive, FB_getContacts, FB_getUserPreferenceData} from '../../util/google/Firestore';
import {Text} from 'react-native';
import Tab_Bar from '../../navigation_drivers/TabBar';
import S_SafeAreaView from '../../components/S_SafeAreaView';
import languages from '../../util/lang/languages';

export default Loading = ({}) => {
  const [loaded, setLoaded] = useState(false);
  const {
    setContactArchive,
    setLang,
    setLangCode,
    updateContacts,
    setCatalog,
    setTheme,
    setContactColors
  } = useContext(AppContext);

  const firebaseData = async () => {
    const firebaseContacts = await FB_getContacts();
    const firebaseContactArchive = await FB_getContactArchive();
    const firebaseUserPreferenceData = await FB_getUserPreferenceData();
    const {contact_colors, lang} = firebaseUserPreferenceData;
    updateContacts(firebaseContacts);
    setContactArchive(firebaseContactArchive);
    setContactColors(contact_colors);
    setLang(languages[lang]);
    setLangCode(lang);
  };

  const asyncData = () => {
    setCatalog([]);
    setTheme('dark');
  }

  useEffect(() => { 
    asyncData();

    firebaseData()
    .then(() => {
      setLoaded(true)
    })
  }, []);

  return (
    <>
      {loaded ? (
        <Tab_Bar />
      ) : (
        <S_SafeAreaView>
          <Text>Loading</Text>
        </S_SafeAreaView>
      )}
    </>
  );
};
