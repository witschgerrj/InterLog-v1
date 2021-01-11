//row for contact
import React from 'react';
import {useTheme} from '@react-navigation/native';
import styled from 'styled-components';

const S_View = styled.View`
  borderBottomColor: ${props => props.borderColor};
  borderBottomWidth: 1px;
  height: 73px;
  padding: 10px 15px;
`

export default Row = ({children}) => {
  const {colors} = useTheme();

  return (
    <S_View borderColor={colors.border}>
      {children}
    </S_View>
  );
};
