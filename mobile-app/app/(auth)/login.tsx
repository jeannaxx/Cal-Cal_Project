import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import CustomAlert from '../component/ui/CustomAlert';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 1. เพิ่ม State สำหรับโชว์/ซ่อนรหัส

  // State สำหรับจัดการ Custom Alert
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    icon: 'information-circle' as keyof typeof Ionicons.glyphMap
  });

  const showAlert = (title: string, message: string, icon: keyof typeof Ionicons.glyphMap = 'alert-circle') => {
    setAlertConfig({ visible: true, title, message, icon });
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showAlert('ข้อมูลไม่ครบ', 'กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วนนะจ๊ะ', 'warning');
      return;
    }

    setLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;

      if (authData.user) {
        // 🔍 ตรวจสอบว่าผู้ใช้คนนี้เคยตั้งค่าโปรไฟล์ (Onboarding) เสร็จหรือยัง
        // เปลี่ยนมาเช็ค daily_calorie_goal ให้ตรงกับที่ Backend บันทึกไว้
        const { data: profile } = await supabase
          .from('profiles')
          .select('gender, daily_calorie_goal')
          .eq('id', authData.user.id)
          .maybeSingle(); // ใช้ maybeSingle เพื่อไม่ให้เกิด Error หากยังไม่มีแถวข้อมูล

        if (profile && profile.gender && profile.daily_calorie_goal !== null) {
          // ✅ มีบัญชีและตั้งค่าเสร็จแล้ว -> ไปหน้า Home
          router.replace('/(tabs)');
        } else {
          // 🆕 บัญชีใหม่หรือตั้งค่าค้างไว้ -> ไปหน้าเริ่มเลือกเพศ
          router.replace('/gender');
        }
      }
    } catch (error: any) {
      showAlert('เข้าสู่ระบบไม่สำเร็จ', error.message, 'close-circle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={styles.content}>
            <View style={styles.headerArea}>
              <View style={styles.logoCircle}>
                <Ionicons name="heart" size={40} color="#fff" />
              </View>
              <Text style={styles.title}>ยินดีต้อนรับ</Text>
              <Text style={styles.subtitle}>เข้าสู่ระบบ CAL-CAL เพื่อเริ่มดูแลตัวเองกันนะ</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>อีเมล</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#f472a0" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="example@mail.com"
                  placeholderTextColor="#ccc"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <Text style={styles.label}>รหัสผ่าน</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#f472a0" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="รหัสผ่าน"
                  placeholderTextColor="#ccc"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible} // 2. สลับการมองเห็นรหัสผ่านด้วย State
                />
                {/* 3. เพิ่มปุ่มสลับการมองเห็น */}
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeBtn}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#BBB"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.loginBtn, loading && styles.disabledBtn]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginBtnText}>เข้าสู่ระบบ</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>ยังไม่มีบัญชี? </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
                  <Text style={styles.registerText}>สมัครสมาชิกที่นี่</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* แสดง Custom Alert แทน Alert ธรรมดา */}
      <CustomAlert 
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        icon={alertConfig.icon}
        onClose={() => setAlertConfig({ ...alertConfig, visible: false })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9FB' },
  content: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  headerArea: { alignItems: 'center', marginBottom: 40 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#f472a0', justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#f472a0', shadowOpacity: 0.3, shadowRadius: 10, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '900', color: '#f472a0', letterSpacing: 1 },
  subtitle: { fontSize: 14, color: '#888', marginTop: 5, fontWeight: '600' },
  form: { width: '100%' },
  label: { fontSize: 15, fontWeight: '700', color: '#f472a0', marginBottom: 10, marginLeft: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15, marginBottom: 20, height: 55, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#444', fontWeight: '600' },
  eyeBtn: { padding: 5 },
  loginBtn: { backgroundColor: '#f472a0', height: 55, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 4, shadowColor: '#f472a0', shadowOpacity: 0.3, shadowRadius: 8, marginTop: 10 },
  disabledBtn: { backgroundColor: '#FFC2D1' },
  loginBtnText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { color: '#888', fontWeight: '600' },
  registerText: { color: '#f472a0', fontWeight: '800' }
});