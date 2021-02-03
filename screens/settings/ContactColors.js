import React, {useLayoutEffect, useState, useContext} from 'react';
import {Pressable} from 'react-native';
import {AppContext} from '../../util/context/AppProvider';
import styled from 'styled-components';
import S_SafeAreaView from '../../components/S_SafeAreaView';
import S_Text from '../../components/S_Text';
import Flex from '../../components/Flex';
import Back from '../../assets/back.png';
import Delete from '../../assets/delete.png';
import Add from '../../assets/add.png';

const Color = styled.View`
  backgroundColor: ${(props) => props.color};
  height: 53px;
  width: 83px;
  borderRadius: 4px;
  marginRight: 16px;
`;

export default ContactColors = ({navigation}) => {

  const {contactColors} = useContext(AppContext)

  const HEADER_SPACING = 16;

  const [deleting, setDeleting] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <HeaderIcon
            source={Back}
            style={{marginLeft: HEADER_SPACING}}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: () =>
          !deleting ? (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              style={{width: 80, marginRight: HEADER_SPACING}}>
              <HeaderIcon source={Delete} onPress={() => setDeleting(true)}/>
              <HeaderIcon
                source={Add}
                onPress={() => {}}
              />
            </Flex>
          ) : (
            <Pressable onPress={() => setDeleting(false)}>
              <S_Text
                color="link"
                style={{
                  marginRight: HEADER_SPACING,
                  fontWeight: 'bold',
                }}>
                Done
              </S_Text>
            </Pressable>
          ),
      },
      [navigation],
    );
  });

  return (
    <S_SafeAreaView>
      {
        contactColors.map((color, index) => (
          <Row>
            <Flex alignItems='center'>
              <Color color={color} key={'color'+index}/>
              <S_Text>{color}</S_Text>
            </Flex>
          </Row>
        ))
      }
    </S_SafeAreaView>
  )
}