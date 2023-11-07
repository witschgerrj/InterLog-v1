import React, {useContext, useState, useLayoutEffect} from 'react';
import {View, Pressable, Image} from 'react-native';
import {AppContext} from '../../util/context/AppProvider';
import Flex from '../../components/Flex';
import Input from '../../components/Input';
import S_Text from '../../components/S_Text';
import S_SafeAreaView from '../../components/S_SafeAreaView';
import NotesPreview from '../../components/NotesPreview';
import HeaderIcon from '../../components/HeaderIcon';
import BackIcon from '../../assets/back.png';

export default ViewItem = ({navigation, route: {params}}) => {
  const {deviceWidth, lang, FB_timestamp} = useContext(AppContext);
  const {
    itemIndex,
    item,
    item: {notes},
  } = params;

  const [name, setName] = useState(item.name);
  const [categories, setCategories] = useState(item.categories);
  const [link, setLink] = useState(item.link);
  const [original, setOriginal] = useState(item);

  const PADDING = 16;
  const HEADER_SPACING = 16;
  const ROW_HEIGHT = 80;
  const BOX_SIZE = 64;
  const MARGIN_BOTTOM = 6;
  const nameWidth = deviceWidth - PADDING * 3 - BOX_SIZE;

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <HeaderIcon
            onPress={() => navigation.goBack()}
            source={BackIcon}
            style={{marginLeft: HEADER_SPACING}}
          />
        ),
      },
      [navigation],
    );
  });

  return (
    <S_SafeAreaView>
      <Flex
        justifyContent="space-between"
        style={{height: ROW_HEIGHT, padding: PADDING}}>
        <View>
          <S_Text
            color="link"
            style={{fontWeight: 'bold', marginBottom: MARGIN_BOTTOM}}>
            {lang.NAME}
          </S_Text>
          <Input
            value={name}
            placeholder="First and Last"
            autoCapitalize="words"
            onChange={setName}
            style={{width: nameWidth}}
            maxLength={50}
          />
        </View>
        <Pressable onPress={() => {}}>
          {
            //Image Picker box
          }
        </Pressable>
      </Flex>
      <View style={{height: ROW_HEIGHT, padding: PADDING}}>
        <S_Text
          color="link"
          style={{fontWeight: 'bold', marginBottom: MARGIN_BOTTOM}}>
          {'Categories'}
        </S_Text>
        <Pressable onPress={() => {}}>
          <S_Text>{categories.map((category) => category + ', ')}</S_Text>
        </Pressable>
      </View>
      <View
        style={{
          height: ROW_HEIGHT,
          padding: PADDING,
          marginBottom: ROW_HEIGHT * 1.5,
        }}>
        <S_Text
          color="link"
          style={{fontWeight: 'bold', marginBottom: MARGIN_BOTTOM}}>
          {'Link'}
        </S_Text>
        <Input value={link} placeholder="www.interlog.io" onChange={setLink} />
      </View>
      <NotesPreview
        navigation={navigation}
        item={item}
        fromScreen="ViewItem"></NotesPreview>
    </S_SafeAreaView>
  );
};
