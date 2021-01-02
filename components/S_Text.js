import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default contacts = ({children}) => {
  const { colors } = useTheme();
  return (
    <Text style={{color: colors.text}}>
      {children}
    </Text>
  )
}