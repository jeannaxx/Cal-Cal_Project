import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
  Keyboard, TouchableWithoutFeedback,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { sendResetPasswordEmail } from '../../lib/authService';
import CustomAlert from '../component/ui/CustomAlert';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
  };

  const handleResetPassword = async () => {
    Keyboard.dismiss();
    
    if (!email.trim()) {
      showAlert('อุ๊ปส์!', 'กรุณากรอกอีเมลก่อนนะจ๊ะ', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      // สร้าง URL สำหรับ Redirect กลับมาที่หน้า reset-password
      // เช่น projectcal://reset-password
      const redirectUrl = Linking.createURL('/reset-password');
      
      const { success, error } = await sendResetPasswordEmail(email, redirectUrl);

      if (!success) throw error;

      showAlert('สำเร็จ!', 'เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลของคุณแล้ว', 'checkmark-circle');
    } catch (err: any) {
      const isRateLimit = err.message?.includes('rate limit');
      showAlert(
        isRateLimit ? 'ใจเย็นๆ นะ' : 'เกิดข้อผิดพลาด',
        isRateLimit ? 'คุณส่งคำขอถี่เกินไป กรุณารออีกสักครู่แล้วค่อยลองใหม่นะ' : (err.message || 'ไม่สามารถส่งอีเมลได้ในขณะนี้'),
        'alert-circle'
      );
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
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.subtitle}>ไม่ต้องตกใจนะ เดี๋ยวเราช่วยเอง!</Text>
            </View>

            <View style={styles.formArea}>
              <Text style={styles.inputLabel}>อีเมลที่ใช้สมัคร</Text>
              <TextInput
                style={styles.input}
                placeholder="example@email.com"
                placeholderTextColor="#FFB7C5"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={[styles.btnMain, isLoading && styles.btnDisabled]}
                disabled={isLoading}
                onPress={handleResetPassword}
              >
                <Text style={styles.btnMainText}>
                  {isLoading ? 'กำลังส่งข้อมูล...' : 'ส่งลิงก์รีเซ็ตรหัสผ่าน'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => router.back()}
            >
              <Text style={styles.btnBackText}>กลับไปหน้าเข้าสู่ระบบ</Text>
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
  title: { fontSize: 32, fontWeight: '900', color: '#FF4D6D', textAlign: 'center' },
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
    marginBottom: 25,
    shadowColor: '#FFB7C5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  btnMain: {
    backgroundColor: '#FF4D6D', 
    borderRadius: 18,
    paddingVertical: 16, 
    alignItems: 'center',
    shadowColor: '#FF4D6D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: { backgroundColor: '#FFB7C5' },
  btnMainText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.5 },
  btnBack: {
    marginTop: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnBackText: {
    color: '#FF758F',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline'
  }
});