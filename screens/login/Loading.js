import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from '../../util/context/AppProvider';
import {Text, SafeAreaView} from 'react-native';
import Tab_Bar from '../../navigation_drivers/TabBar';
import english_us from '../../util/language/English';
import {mock_catalog, mock_contacts} from '../../util/google/Firestore';


export default Loading = ({}) => {
  const [loaded, setLoaded] = useState(false);
  const {
    setLang,
    setContacts,
    setCatalog,
    setTheme,
    setGroupColors
  } = useContext(AppContext);

  const getData = () => {
    setLang(English);
    setContacts(mock_contacts);
    setCatalog(mock_catalog);
    setTheme('dark');
    setGroupColors([]);
  };

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      {loaded ? (
        <Tab_Bar />
      ) : (
        <SafeAreaView>
          <Text>Loading</Text>
        </SafeAreaView>
      )}
    </>
  );
};
