// mobile-app/app/login.tsx
import { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import { login } from '../services/authService'
import { router } from 'expo-router'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      await login(email, password)
      router.replace('/login')
    } catch (err: any) {
      Alert.alert('เข้าสู่ระบบไม่สำเร็จ', err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity onPress={handleLogin} disabled={loading}>
        <Text>{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</Text>
      </TouchableOpacity>
    </View>
  )
}