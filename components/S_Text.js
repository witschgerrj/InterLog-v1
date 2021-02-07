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

export default S_Text = ({
  color,
  textAlign,
  numberOfLines,
  style,
  children,
}) => {
  const {colors, fontSize} = useTheme();

  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        color: textColor({colors, color}),
        fontSize: fontSize.md,
        textAlign,
        ...style,
      }}>
      {children}
    </Text>
  );
};

S_Text.defaultProps = {
  textAlign: 'left',
};
