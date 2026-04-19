import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useUser } from './context/usecontext';

export default function EditProfileScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [username, setUsername] = useState(userData.username || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    if (!username.trim()) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อผู้ใช้งาน');
      return;
    }

    setLoading(true);
    try {
      // 1. อัปเดตใน Supabase Auth (user_metadata)
      const { data: authData, error: authError } = await supabase.auth.updateUser({
        data: { username: username }
      });

      if (authError) throw authError;

      // 2. อัปเดตในตาราง profiles (เพื่อให้สอดคล้องกับระบบฐานข้อมูล)
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ username: username })
        .eq('id', authData.user?.id);

      if (profileError) {
        console.warn('Profile table update failed:', profileError.message);
        // ไม่ throw error ที่นี่เพื่อให้ user metadata ยังทำงานได้
      }

      // 3. อัปเดตข้อมูลใน Global Context
      setUserData((prev: any) => ({
        ...prev,
        username: username
      }));

      Alert.alert('สำเร็จ', 'อัปเดตโปรไฟล์เรียบร้อยแล้ว', [
        { text: 'ตกลง', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert('เกิดข้อผิดพลาด', error.message);
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
          <Text style={styles.headerTitle}>แก้ไขโปรไฟล์</Text>
          <View style={{ width: 28 }} />
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        <Text style={styles.label}>ชื่อผู้ใช้งาน</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#FF85A2" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="ระบุชื่อผู้ใช้งานใหม่"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity 
          style={[styles.saveBtn, loading && styles.disabledBtn]} 
          onPress={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveBtnText}>บันทึกข้อมูล</Text>
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
    borderRadius: 20, paddingHorizontal: 15, marginBottom: 30,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 55, fontSize: 16, color: '#444', fontWeight: '600' },
  saveBtn: { 
    backgroundColor: '#FF85A2', height: 55, borderRadius: 25, 
    justifyContent: 'center', alignItems: 'center', elevation: 3 
  },
  disabledBtn: { backgroundColor: '#FFC2D1' },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: '800' }
});