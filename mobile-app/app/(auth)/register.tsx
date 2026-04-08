import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'

export default function RegisterScreen() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        {/* <Text style={styles.label}>Member</Text> */}
        <Text style={styles.title}>สร้างบัญชีใหม่เพื่อเริ่มต้นใช้งาน</Text>

        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#f9a8c0"
          value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#f9a8c0"
          value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#f9a8c0"
          value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#f9a8c0"
          value={confirm} onChangeText={setConfirm} secureTextEntry />

        <Text style={styles.policy}>
          เมื่อคุณกดปุ่มลงชื่อเข้าใช้เท่ากับว่าคุณได้อ่านและยอมรับ{'\n'}
          <Text style={styles.policyLink}>นโยบายความเป็นส่วนตัวและเงื่อนไขการใช้บริการ</Text>
        </Text>

        <TouchableOpacity style={styles.btnMain} onPress={() => router.push('./(tabs)/index')}>
          <Text style={styles.btnMainText}>สร้างบัญชี</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline}
          onPress={() => { setUsername(''); setEmail(''); setPassword(''); setConfirm('') }}>
          <Text style={styles.btnOutlineText}>ล้างข้อมูล</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff5f7' },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 32 },

  back: { fontSize: 22, color: '#e07090', marginBottom: 16 },

  label: { fontSize: 12, color: '#f9a8c0', marginBottom: 4 },
  title: { fontSize: 17, fontWeight: '700', color: '#c23b6a', marginBottom: 28 },

  input: {
    borderBottomWidth: 1.5, borderBottomColor: '#f9c4d0',
    paddingVertical: 12, fontSize: 14,
    color: '#c23b6a', marginBottom: 12,
  },

  policy: {
    fontSize: 11, color: '#e07090', textAlign: 'center',
    marginTop: 20, marginBottom: 20, lineHeight: 18,
  },
  policyLink: { textDecorationLine: 'underline', color: '#e75480' },

  btnMain: {
    backgroundColor: '#f472a0', borderRadius: 24,
    paddingVertical: 14, alignItems: 'center', marginBottom: 12,
  },
  btnMainText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  btnOutline: {
    borderWidth: 1.5, borderColor: '#f9c4d0', borderRadius: 24,
    paddingVertical: 13, alignItems: 'center',
  },
  btnOutlineText: { color: '#e07090', fontSize: 16 },
})