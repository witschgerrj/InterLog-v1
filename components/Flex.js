//row for contact
import React from 'react';
import styled from 'styled-components';

const S_View = styled.View`
  flexDirection: ${(props) => props.flexDirection};
  justifyContent: ${(props) => props.justifyContent};
  flexWrap: ${(props) => props.flexWrap}
  display: flex;
`;

export default Flex = ({
  flexDirection,
  justifyContent,
  flexWrap,
  alignItems,
  style,
  children,
}) => {
  return (
    <S_View
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      flexWrap={flexWrap}
      alignItems={alignItems}
      style={{...style}}>
      {children}
    </S_View>
  );
};

Flex.defaultProps = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  flexWrap: 'nowrap',
  alignItems: 'stretch'
};
