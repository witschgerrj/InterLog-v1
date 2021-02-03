import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../util/context/AppProvider';
import {FB_getContactArchive, FB_getContacts, FB_getUserPreferenceData} from '../../util/google/Firestore';
import {Text} from 'react-native';
import Tab_Bar from '../../navigation_drivers/TabBar';
import English from '../../util/language/English';
import S_SafeAreaView from '../../components/S_SafeAreaView';

export default Loading = ({}) => {
  const [loaded, setLoaded] = useState(false);
  const {
    setContactArchive,
    setLang,
    updateContacts,
    setCatalog,
    setTheme,
    setContactColors
  } = useContext(AppContext);

  const firebaseData = async () => {
    const firebaseContacts = await FB_getContacts();
    const firebaseContactArchive = await FB_getContactArchive();
    const firebaseUserPreferenceData = await FB_getUserPreferenceData();
    const {contact_colors} = firebaseUserPreferenceData;
    updateContacts(firebaseContacts);
    setContactArchive(firebaseContactArchive);
    setContactColors(contact_colors);
  };

  const asyncData = () => {
    setLang(English);
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
