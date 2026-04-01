import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function Input({ placeholder, secureTextEntry, value, onChangeText }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 8,
  },
});