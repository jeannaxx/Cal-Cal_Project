import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
  Keyboard, TouchableWithoutFeedback, 
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase'; // ใช้ Alias หรือ Path ที่ถูกต้อง
import { useUser } from '../context/usecontext';
import CustomAlert from '../component/ui/CustomAlert';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ 
    visible: false, 
    title: '', 
    message: '', 
    icon: 'information-circle' as keyof typeof Ionicons.glyphMap 
  });
  const { setUserData } = useUser();

  const showAlert = (title: string, message: string, icon: keyof typeof Ionicons.glyphMap = 'information-circle') => {
    setAlertConfig({ visible: true, title, message, icon });
  };

  const hideAlert = () => {
    setAlertConfig({ ...alertConfig, visible: false });
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!email.trim() || !password.trim()) {
      showAlert('อุ๊ปส์!', 'กรอกอีเมลและรหัสผ่านให้ครบถ้วนนะ', 'warning');
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // ดึงข้อมูลโปรไฟล์มาเช็คว่ากรอกข้อมูล onboarding หรือยัง
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .maybeSingle(); // ใช้ maybeSingle เพื่อป้องกัน Error ถ้ายังไม่มี Profile

      if (profile && profile.weight) {
        // ถ้ามีข้อมูลครบแล้ว ไปหน้าหลัก
        router.replace('/(tabs)' as any);
      } else {
        // ถ้ายังไม่มีข้อมูลร่างกาย ให้ไปหน้าเลือกเพศ (Onboarding)
        router.replace('/gender' as any);
      }
    } catch (err: any) {
      showAlert('เข้าสู่ระบบไม่สำเร็จ', err.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้องจ้า', 'alert-circle');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={styles.content} 
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerArea}>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>ยินดีต้อนรับกลับมานะ!</Text>
            </View>

            <View style={styles.formArea}>
              <Text style={styles.inputLabel}>อีเมล</Text>
              <TextInput
                style={styles.input}
                placeholder="example@email.com"
                placeholderTextColor="#FFB7C5"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <Text style={styles.inputLabel}>รหัสผ่าน</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#FFB7C5"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity 
                style={styles.forgetRow} 
                onPress={() => router.push('/(auth)/forgot-password' as any)}
              >
                <Text style={styles.forgetText}>ลืมรหัสผ่าน?</Text>
              </TouchableOpacity>

              {/* เข้าสู่ระบบ */}
              <TouchableOpacity
                style={[styles.btnMain, isLoading && styles.btnDisabled]}
                disabled={isLoading}
                onPress={handleLogin}
              >
                <Text style={styles.btnMainText}>
                  {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>หรือใช้งานบัญชีอื่น</Text>
              <View style={styles.line} />
            </View>

            {/* สร้างบัญชี */}
            <TouchableOpacity
              style={styles.btnRegister}
              onPress={() => router.push('/(auth)/register' as any)}
            >
              <Text style={styles.btnWhiteText}>สร้างบัญชี</Text>
            </TouchableOpacity>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <CustomAlert 
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        icon={alertConfig.icon}
        onClose={hideAlert}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F3' },
  content: { flexGrow: 1, paddingHorizontal: 32, justifyContent: 'center', paddingVertical: 60 },
  headerArea: { marginBottom: 40, alignItems: 'center' },
  title: { fontSize: 36, fontWeight: '900', color: '#FF4D6D', textAlign: 'center', letterSpacing: 1 },
  subtitle: { fontSize: 16, color: '#f472a0', textAlign: 'center', marginTop: 8, fontWeight: '500' },
  formArea: { width: '100%' },
  inputLabel: { fontSize: 14, fontWeight: '700', color: '#FF4D6D', marginBottom: 8, marginLeft: 4 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#590D22',
    marginBottom: 20,
    shadowColor: '#FFB7C5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  forgetRow: { alignItems: 'flex-end', marginBottom: 25 },
  forgetText: { color: '#FF758F', fontSize: 14, fontWeight: '600' },
  btnMain: {
    backgroundColor: '#57ab4a', 
    borderRadius: 18,
    paddingVertical: 16, 
    alignItems: 'center',
    shadowColor: '#38B000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: { backgroundColor: '#CCFFCC' },
  btnMainText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.5 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#FFB7C5' },
  dividerText: { marginHorizontal: 12, color: '#FF85A1', fontSize: 13, fontWeight: '600' },
  btnRegister: {
    backgroundColor: '#f472a0', 
    borderRadius: 18,
    paddingVertical: 16, 
    alignItems: 'center',
    shadowColor: '#FF4D6D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnWhiteText: { color: '#ffffff', fontWeight: '800', fontSize: 17, letterSpacing: 0.5 },
});