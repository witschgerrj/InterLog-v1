import React from 'react';
import {KeyboardAvoidingView, SafeAreaView, Pressable} from 'react-native';

export default S_SafeAreaView = ({children, onPress}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}}>
          {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};