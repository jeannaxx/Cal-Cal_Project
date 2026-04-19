import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
  Alert, Keyboard, TouchableWithoutFeedback,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import CustomAlert from '../component/ui/CustomAlert';

export default function RegisterScreen() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [alertConfig, setAlertConfig] = useState({ 
    visible: false, 
    title: '', 
    message: '', 
    icon: 'information-circle' as keyof typeof Ionicons.glyphMap 
  });

  const showAlert = (title: string, message: string, icon: keyof typeof Ionicons.glyphMap = 'information-circle') => {
    setAlertConfig({ visible: true, title, message, icon });
  };

  const hideAlert = () => {
    setAlertConfig({ ...alertConfig, visible: false });
    if (isSuccess) {
      router.replace('/(auth)/login' as any);
    }
  };

  const handleRegister = async () => {
    Keyboard.dismiss();
    
    // Validation เบื้องต้น
    if (!displayName.trim() || !email.trim() || !password.trim()) {
      showAlert('อุ๊ปส์!', 'กรุณากรอกข้อมูลให้ครบถ้วนนะจ๊ะ', 'warning');
      return;
    }
    if (password !== confirmPassword) {
      showAlert('ผิดพลาด', 'รหัสผ่านทั้งสองช่องไม่ตรงกันนะ', 'lock-closed');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          }
        }
      });

      if (error) throw error;

      setIsSuccess(true);
      showAlert('สำเร็จ!', 'ลงทะเบียนเรียบร้อย! อย่าลืมเช็คอีเมลเพื่อยืนยันตัวตนนะ', 'checkmark-circle');
    } catch (err: any) {
      showAlert('สมัครสมาชิกไม่สำเร็จ', err.message || 'เกิดข้อผิดพลาดบางอย่างจ้า', 'alert-circle');
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
              <Text style={styles.title}>Register</Text>
              <Text style={styles.subtitle}>มาเริ่มดูแลตัวเองไปพร้อมกันนะ!</Text>
            </View>

            <View style={styles.formArea}>
              <Text style={styles.inputLabel}>ชื่อผู้ใช้งาน</Text>
              <TextInput
                style={styles.input}
                placeholder="ชื่อของคุณ"
                placeholderTextColor="#FFB7C5"
                value={displayName}
                onChangeText={setDisplayName}
              />

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
                placeholder="รหัสผ่าน 6 ตัวขึ้นไป"
                placeholderTextColor="#FFB7C5"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Text style={styles.inputLabel}>ยืนยันรหัสผ่าน</Text>
              <TextInput
                style={styles.input}
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                placeholderTextColor="#FFB7C5"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              {/* ปุ่มสมัครสมาชิก */}
              <TouchableOpacity
                style={[styles.btnMain, isLoading && styles.btnDisabled]}
                disabled={isLoading}
                onPress={handleRegister}
              >
                <Text style={styles.btnMainText}>
                  {isLoading ? 'กำลังลงทะเบียน...' : 'สร้างบัญชีใหม่'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>มีบัญชีอยู่แล้ว?</Text>
              <View style={styles.line} />
            </View>

            {/* กลับไปหน้า Login */}
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => router.back()}
            >
              <Text style={styles.btnPinkText}>กลับไปหน้าเข้าสู่ระบบ</Text>
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
  headerArea: { marginBottom: 30, alignItems: 'center' },
  title: { fontSize: 36, fontWeight: '900', color: '#FF4D6D', textAlign: 'center', letterSpacing: 1 },
  subtitle: { fontSize: 16, color: '#FF758F', textAlign: 'center', marginTop: 8, fontWeight: '500' },
  formArea: { width: '100%' },
  inputLabel: { fontSize: 14, fontWeight: '700', color: '#FF4D6D', marginBottom: 8, marginLeft: 4 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#590D22',
    marginBottom: 16,
    shadowColor: '#FFB7C5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  btnMain: {
    backgroundColor: '#6fb165', 
    borderRadius: 18,
    paddingVertical: 16, 
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#38B000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: { backgroundColor: '#CCFFCC' },
  btnMainText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.5 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 25 },
  line: { flex: 1, height: 1, backgroundColor: '#FFB7C5' },
  dividerText: { marginHorizontal: 12, color: '#FF85A1', fontSize: 13, fontWeight: '600' },
  btnLogin: {
    backgroundColor: '#f472a0', 
    borderRadius: 18,
    paddingVertical: 16, 
    alignItems: 'center',
    shadowColor: '#ffa8b8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPinkText: { color: '#ffffff', fontWeight: '800', fontSize: 17, letterSpacing: 0.5 },
});
