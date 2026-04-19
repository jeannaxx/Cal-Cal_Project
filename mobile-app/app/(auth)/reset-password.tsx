import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
  Keyboard, TouchableWithoutFeedback,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { updatePassword } from '../../lib/authService';
import CustomAlert from '../component/ui/CustomAlert';
import { Ionicons } from '@expo/vector-icons';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
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

  const handleUpdatePassword = async () => {
    Keyboard.dismiss();
    
    if (!newPassword.trim() || !confirmPassword.trim()) {
      showAlert('อุ๊ปส์!', 'กรุณากรอกข้อมูลให้ครบถ้วนนะจ๊ะ', 'warning');
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert('ผิดพลาด', 'รหัสผ่านทั้งสองช่องไม่ตรงกันนะ', 'lock-closed');
      return;
    }

    if (newPassword.length < 6) {
      showAlert('รหัสผ่านสั้นไป', 'กรุณาตั้งรหัสผ่านอย่างน้อย 6 ตัวอักษรนะ', 'shield-checkmark');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await updatePassword(newPassword);

      if (error) throw error;

      setIsSuccess(true);
      showAlert('สำเร็จ!', 'รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้วจ้า', 'checkmark-circle');
    } catch (err: any) {
      showAlert('เกิดข้อผิดพลาด', err.message || 'ไม่สามารถเปลี่ยนรหัสผ่านได้ในขณะนี้', 'alert-circle');
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
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>ตั้งรหัสผ่านใหม่ที่จำง่ายและปลอดภัยนะ</Text>
            </View>

            <View style={styles.formArea}>
              <Text style={styles.inputLabel}>รหัสผ่านใหม่</Text>
              <TextInput
                style={styles.input}
                placeholder="รหัสผ่านใหม่ 6 ตัวขึ้นไป"
                placeholderTextColor="#FFB7C5"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />

              <Text style={styles.inputLabel}>ยืนยันรหัสผ่านใหม่</Text>
              <TextInput
                style={styles.input}
                placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                placeholderTextColor="#FFB7C5"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              <TouchableOpacity
                style={[styles.btnMain, isLoading && styles.btnDisabled]}
                disabled={isLoading}
                onPress={handleUpdatePassword}
              >
                <Text style={styles.btnMainText}>
                  {isLoading ? 'กำลังบันทึก...' : 'บันทึกรหัสผ่านใหม่'}
                </Text>
              </TouchableOpacity>
            </View>

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
    marginBottom: 20,
    shadowColor: '#FFB7C5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  btnMain: {
    backgroundColor: '#38B000', 
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
});