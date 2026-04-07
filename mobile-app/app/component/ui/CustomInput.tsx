import React from 'react';
import { View, TextInput, Text, StyleSheet, KeyboardTypeOptions } from 'react-native';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;       // แก้ type ให้ถูกต้อง
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'; // เพิ่มตรงนี้
}

export const CustomInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry,
  keyboardType,       // รับเข้ามา
  autoCapitalize,     // รับเข้ามา
}: CustomInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={label}
        placeholderTextColor="#A9A9A9"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}         // ส่งให้ TextInput
        autoCapitalize={autoCapitalize}     // ส่งให้ TextInput
        style={[
          styles.input,
          touched && error ? styles.inputError : styles.inputDefault,
        ]}
      />
      {touched && error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%',
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  inputDefault: {
    borderBottomColor: '#E0E0E0',
  },
  inputError: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});