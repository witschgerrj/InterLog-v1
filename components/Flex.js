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
  children,
  flexDirection,
  justifyContent,
  style,
  flexWrap,
}) => {
  return (
    <S_View
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      flexWrap={flexWrap}
      style={{...style}}>
      {children}
    </S_View>
  );
};

Flex.defaultProps = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: '100%',
  flexWrap: 'nowrap',
};
