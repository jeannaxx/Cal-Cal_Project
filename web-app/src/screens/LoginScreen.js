import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../components/input';
import Button from '../components/button';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      Alert.alert('Login สำเร็จ!');
      // navigation.navigate('Dashboard'); // ถ้ามีหน้าอื่น
    } else {
      Alert.alert('ผิดพลาด', 'Username หรือ Password ไม่ถูกต้อง');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>

      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffe4ec',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff6b9a',
  },
});