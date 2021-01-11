import React from 'react';
import {TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default Input = ({
  value,
  placeholder,
  onChange,
  style,
  maxLength,
  multiline,
  onFocus
}) => {
  const {colors, fontSize} = useTheme();

  return (
    <TextInput
      style={{
        color: colors.text,
        fontSize: fontSize.md,
        ...style,
      }}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={colors.secondary}
      onChangeText={onChange}
      maxLength={maxLength}
      multiline={multiline}
      onFocus={onFocus}
    />
  );
};

Input.defaultProps = {
  multiline: false,
}
