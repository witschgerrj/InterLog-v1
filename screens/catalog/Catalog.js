import React, {useContext, useLayoutEffect, useState} from 'react';
import {AppContext} from '../../util/context/AppProvider';
import {ScrollView} from 'react-native';
import HeaderIcon from '../../components/HeaderIcon';
import Grid from '../../assets/grid.png';
import Add from '../../assets/add.png';
import Layers from '../../assets/layers.png';
import Item from './components/Item';

export default Catalog = ({navigation}) => {
  const {catalog, deviceWidth} = useContext(AppContext);
  const [gridWidthIndex, setGridWidthIndex] = useState(0);

  const GRID_WIDTH_LIST = [2, 3, 4];
  const GRID_WIDTH = GRID_WIDTH_LIST[gridWidthIndex];
  const HEADER_SPACING = 16;
  const PADDING = 8;
  const BOX_SIZE = Math.floor(
    (deviceWidth - PADDING * (GRID_WIDTH + 1)) / GRID_WIDTH,
  );

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
          <Flex
            justifyContent="space-between"
            style={{width: 80, marginRight: HEADER_SPACING}}>
            <HeaderIcon source={Layers} />
            <HeaderIcon source={Add} />
          </Flex>
        ),
      },
      [navigation],
    );
  });

  return (
    <ScrollView>
      <Flex flexWrap="wrap" style={{paddingLeft: PADDING}}>
        {catalog.map((item, index) => (
          <Item
            size={BOX_SIZE}
            item={item}
            navigation={navigation}
            key={'item' + index}
          />
        ))}
      </Flex>
    </ScrollView>
  );
};
