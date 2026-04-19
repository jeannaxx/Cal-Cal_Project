import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    // 1. Validation เบื้องต้น
    if (newPassword.length < 6) {
      Alert.alert('ข้อผิดพลาด', 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('ข้อผิดพลาด', 'รหัสผ่านยืนยันไม่ตรงกัน');
      return;
    }

    setLoading(true);
    try {
      // 2. เรียกใช้ฟังก์ชัน updateUser ของ Supabase
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      Alert.alert('สำเร็จ', 'เปลี่ยนรหัสผ่านใหม่เรียบร้อยแล้ว', [
        { text: 'ตกลง', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert('เปลี่ยนรหัสผ่านไม่สำเร็จ', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>เปลี่ยนรหัสผ่าน</Text>
          <View style={{ width: 28 }} />
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        <Text style={styles.label}>รหัสผ่านใหม่</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#FF85A2" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="ระบุรหัสผ่านใหม่"
            secureTextEntry
          />
        </View>

        <Text style={styles.label}>ยืนยันรหัสผ่านใหม่</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#FF85A2" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="ระบุรหัสผ่านใหม่อีกครั้ง"
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={[styles.saveBtn, loading && styles.disabledBtn]} 
          onPress={handleChangePassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveBtnText}>อัปเดตรหัสผ่าน</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9FB' },
  headerBackground: { backgroundColor: '#FF85A2', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  header: { height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  backBtn: { padding: 5 },
  content: { padding: 25, marginTop: 20 },
  label: { fontSize: 16, fontWeight: '700', color: '#f472a0', marginBottom: 10, marginLeft: 5 },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', 
    borderRadius: 20, paddingHorizontal: 15, marginBottom: 20,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 55, fontSize: 16, color: '#444', fontWeight: '600' },
  saveBtn: { 
    backgroundColor: '#FF85A2', height: 55, borderRadius: 25, 
    justifyContent: 'center', alignItems: 'center', elevation: 3, marginTop: 20
  },
  disabledBtn: { backgroundColor: '#FFC2D1' },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: '800' }
});