import React from 'react';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

const textColor = ({colors, color}) => {
  switch (color) {
    case 'secondary':
      return colors.secondary;
    case 'link':
      return colors.link;
    case 'error':
      return colors.error;
    default:
      return colors.text;
  }
};

export default S_Text = ({children, color, textAlign, style}) => {
  const {colors, fontSize} = useTheme();

  return (
    <Text
      style={{
        color: textColor({colors, color}),
        fontSize: fontSize.md,
        textAlign,
        ...style
      }}>
      {children}
    </Text>
  );
};

S_Text.defaultProps = {
  textAlign: 'left',
};
