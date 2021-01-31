import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../util/context/AppProvider';
import {FB_getContactArchive, FB_getContacts, mock_group_colors} from '../../util/google/Firestore';
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
    setGroupColors
  } = useContext(AppContext);

  const firebaseData = async () => {
    const firebaseContacts = await FB_getContacts();
    const firebaseContactArchive = await FB_getContactArchive();
    updateContacts(firebaseContacts);
    setContactArchive(firebaseContactArchive);
  };

  const asyncData = () => {
    setLang(English);
    setCatalog([]);
    setTheme('dark');
    setGroupColors(mock_group_colors);
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
