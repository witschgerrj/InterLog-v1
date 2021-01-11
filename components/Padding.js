import React from 'react';
import styled from 'styled-components';

const S_View = styled.View`
  paddingTop: ${props => props.pt}px;
  paddingRight: ${props => props.pr}px;
  paddingBottom: ${props => props.pb}px;
  paddingLeft: ${props => props.pl}px; 
`;

export default Padding = ({children, pt, pr, pb, pl}) => {
  return (
    <S_View pt={pt} pr={pr} pb={pb} pl={pl}>
      {children}
    </S_View>
  );
};

Padding.defaultProps = {
  pt: 0,
  pr: 0,
  pb: 0,
  pl: 0,
};
