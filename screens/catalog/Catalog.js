import React, {useContext, useLayoutEffect, useState} from 'react';
import {Text, Pressable} from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import Grid from '../../assets/grid.png';
import Add from '../../assets/add.png';
import GridBox from './components/GridBox';
import {AppContext} from '../../util/context/AppProvider';
import {set} from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

export default Catalog = ({navigation}) => {
  const {catalog, deviceWidth} = useContext(AppContext);
  const [gridWidthIndex, setGridWidthIndex] = useState(0);

  const GRID_WIDTH_LIST = [2, 3, 4];
  const GRID_WIDTH = GRID_WIDTH_LIST[gridWidthIndex];
  const HEADER_SPACING = 16;
  const PADDING = 16;
  const BOX_SIZE = (deviceWidth - PADDING * (GRID_WIDTH + 1)) / GRID_WIDTH;

  const cylceGridWidth = () => {
    if (gridWidthIndex === GRID_WIDTH_LIST.length - 1) {
      setGridWidthIndex(0);
      return;
    }
    setGridWidthIndex(gridWidthIndex + 1);
  };

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerLeft: () => (
          <HeaderIcon
            source={Grid}
            onPress={cylceGridWidth}
            style={{marginLeft: HEADER_SPACING}}
          />
        ),
        headerRight: () => (
          <HeaderIcon source={Add} style={{marginRight: HEADER_SPACING}} />
        ),
      },
      [navigation],
    );
  });

  return (
    <ScrollView>
      <Flex flexWrap="wrap" style={{paddingLeft: PADDING}}>
        {catalog.map((item) => (
          <GridBox
            size={BOX_SIZE}
            name={item.name}
            source={item.source}
            style={{marginRight: PADDING, marginTop: PADDING, borderRadius: 4}}
          />
        ))}
      </Flex>
    </ScrollView>
  );
};
