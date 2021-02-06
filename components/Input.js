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
  onFocus,
  editable,
  autoCapitalize,
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
      editable={editable}
      onFocus={onFocus}
      autoCorrect={false} 
      spellCheck={false}
      autoCapitalize={autoCapitalize}
    />
  );
};

Input.defaultProps = {
  multiline: false,
  autoCapitalize: 'none',
}
