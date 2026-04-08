import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
  Alert, Keyboard, TouchableWithoutFeedback,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../component/common/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!email.trim() || !password.trim()) {
      Alert.alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const profile = await AsyncStorage.getItem('userProfile');
      if (profile) {
        router.replace('/(tabs)' as any);
      } else {
        router.replace('/(tabs)/onboarding/index' as any);
      }
    } catch (err: any) {
      Alert.alert('เข้าสู่ระบบไม่สำเร็จ', err.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>สวัสดีจ้า คนเก่ง!</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#f9a8c0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#f9a8c0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.forgetRow}>
              <Text style={styles.forgetText}>forget password?</Text>
            </TouchableOpacity>

            {/* เข้าสู่ระบบ */}
            <TouchableOpacity
              style={[styles.btnMain, isLoading && styles.btnDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.btnMainText}>
                {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>หรือ</Text>
              <View style={styles.line} />
            </View>

            {/* Google */}
            <TouchableOpacity style={styles.btnGoogle}>
              <Text style={styles.btnGoogleText}>เข้าสู่ระบบด้วย Google</Text>
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity style={styles.btnFacebook}>
              <Text style={styles.btnWhiteText}>เข้าสู่ระบบด้วย Facebook</Text>
            </TouchableOpacity>

            {/* สร้างบัญชี */}
            <TouchableOpacity
              style={styles.btnRegister}
              onPress={() => router.push('/(auth)/register' as any)}
            >
              <Text style={styles.btnWhiteText}>สร้างบัญชี</Text>
            </TouchableOpacity>

            <Text style={styles.policy}>
              เมื่อคุณกดปุ่มลงชื่อเข้าใช้เท่ากับว่าคุณได้อ่านและยอมรับ{'\n'}
              <Text style={styles.policyLink}>นโยบายความเป็นส่วนตัวและเงื่อนไขการใช้บริการ</Text>
            </Text>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDE2E4' },
  content: { flexGrow: 1, paddingHorizontal: 32, justifyContent: 'center', paddingVertical: 40 },

  title: { fontSize: 28, fontWeight: 'bold', color: '#555', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 15, color: '#888', textAlign: 'center', marginBottom: 32 },

  input: {
    borderBottomWidth: 1.5, borderBottomColor: '#f9c4d0',
    paddingVertical: 12, fontSize: 14,
    color: '#c23b6a', marginBottom: 12,
  },

  forgetRow: { alignItems: 'flex-end', marginBottom: 20 },
  forgetText: { color: '#aaa', fontSize: 13 },

  btnMain: {
    backgroundColor: '#4CAF50', borderRadius: 30,
    paddingVertical: 14, alignItems: 'center', marginBottom: 4,
  },
  btnDisabled: { backgroundColor: '#a5d6a7' },
  btnMainText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  dividerText: { marginHorizontal: 10, color: '#aaa', fontSize: 13 },

  btnGoogle: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 30,
    paddingVertical: 13, alignItems: 'center',
    backgroundColor: 'white', marginBottom: 10,
  },
  btnGoogleText: { color: '#555', fontWeight: '500' },

  btnFacebook: {
    backgroundColor: '#4267B2', borderRadius: 30,
    paddingVertical: 13, alignItems: 'center', marginBottom: 10,
  },

  btnRegister: {
    backgroundColor: '#FF6B9D', borderRadius: 30,
    paddingVertical: 13, alignItems: 'center', marginBottom: 20,
  },
  btnWhiteText: { color: '#fff', fontWeight: '500' },

  policy: {
    fontSize: 11, color: '#4a90d9', textAlign: 'center', lineHeight: 18,
  },
  policyLink: { color: '#e57373', textDecorationLine: 'underline' },
});