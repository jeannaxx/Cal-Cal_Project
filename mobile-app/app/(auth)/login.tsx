//หน้าเข้าสู่ระบบ มีหลายปุ่มนั้นเอง

import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, SafeAreaView,
  Alert, Keyboard, TouchableWithoutFeedback,
  KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../component/common/supabase';
import { CustomInput } from '../component/ui/CustomInput';
import { CustomButton } from '../component/ui/CustomButton';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    let valid = true;
    if (!email.trim()) { setEmailError('กรุณากรอกอีเมล'); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError('รูปแบบอีเมลไม่ถูกต้อง'); valid = false; }
    else setEmailError('');
    if (!password.trim()) { setPasswordError('กรุณากรอกรหัสผ่าน'); valid = false; }
    else setPasswordError('');
    return valid;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.replace('/(tabs)' as any);
    } catch (err: any) {
      Alert.alert('เข้าสู่ระบบไม่สำเร็จ', err.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>

            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>สวัสดีจ้า คนเก่ง! </Text>

            <CustomInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              onBlur={validate}
              error={emailError}
              touched={!!emailError}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CustomInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              onBlur={validate}
              error={passwordError}
              touched={!!passwordError}
              secureTextEntry
            />

            <TouchableOpacity style={styles.forgetRow}>
              <Text style={styles.forgetText}>forget password?</Text>
            </TouchableOpacity>

            <CustomButton title="เข้าสู่ระบบ" onPress={handleLogin} isLoading={isLoading} />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>หรือ</Text>
              <View style={styles.line} />
            </View>

            {/* Google */}
            <TouchableOpacity style={styles.googleBtn}>
              <Text style={styles.googleText}>เข้าสู่ระบบด้วย Google</Text>
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity style={styles.facebookBtn}>
              <Text style={styles.whiteText}>เข้าสู่ระบบด้วย Facebook</Text>
            </TouchableOpacity>

            {/* สร้างบัญชี */}
            <TouchableOpacity style={styles.registerBtn} onPress={() => router.push('/(auth)/register' as any)}>
              <Text style={styles.whiteText}>สร้างบัญชี</Text>
            </TouchableOpacity>

            <Text style={styles.termBlue}>เมื่อคุณกดปุ่มลงชื่อเข้าใช้เท่ากับว่าคุณได้อ่านและยอมรับ</Text>
            <Text style={styles.termRed}>นโยบายความเป็นส่วนตัวและเงื่อนไขการใช้บริการ</Text>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDE2E4' },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#555', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 15, color: '#888', textAlign: 'center', marginBottom: 32 },
  forgetRow: { alignItems: 'flex-end', marginBottom: 20 },
  forgetText: { color: '#aaa', fontSize: 13 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  dividerText: { marginHorizontal: 10, color: '#aaa' },
  googleBtn: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 30,
    paddingVertical: 13, alignItems: 'center', backgroundColor: 'white', marginBottom: 10,
  },
  googleText: { color: '#555', fontWeight: '500' },
  facebookBtn: {
    backgroundColor: '#4267B2', borderRadius: 30,
    paddingVertical: 13, alignItems: 'center', marginBottom: 10,
  },
  registerBtn: {
    backgroundColor: '#FF6B9D', borderRadius: 30,
    paddingVertical: 13, alignItems: 'center', marginBottom: 16,
  },
  whiteText: { color: 'white', fontWeight: '500' },
  termBlue: { color: '#4a90d9', textAlign: 'center', fontSize: 12 },
  termRed: { color: '#e57373', textAlign: 'center', fontSize: 12 },
});