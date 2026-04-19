import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useUser } from './context/usecontext';
import axios from 'axios';
import { API_URL } from '../constants/Config';

export default function EditProfileScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [username, setUsername] = useState(userData.username || '');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  // ดึงข้อมูลโปรไฟล์ปัจจุบันมาแสดงในช่องกรอกทันทีที่เปิดหน้า
  useEffect(() => {
    const fetchCurrentProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const res = await axios.get(`${API_URL}/profiles/me`, {
          headers: { 
            'Authorization': `Bearer ${session?.access_token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (res.data.full_name) {
          setFullName(res.data.full_name);
        }
      } catch (error) {
        console.error("Fetch current profile failed:", error);
      }
    };
    fetchCurrentProfile();
  }, []);

  const handleUpdateProfile = async () => {
    if (!username.trim() || !fullName.trim()) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบถ้วนจ้า');
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      // 1. อัปเดต Username ใน Supabase Auth (user_metadata)
      const { error: authError } = await supabase.auth.updateUser({
        data: { username: username }
      });

      if (authError) throw authError;

      // 2. อัปเดต Full Name ในตาราง profiles ผ่าน Backend API
      // การใช้ API จะช่วยเลี่ยงปัญหา RLS 42501 เพราะฝั่ง Server มีสิทธิ์ Service Role
      await axios.put(`${API_URL}/profiles/me`, {
        full_name: fullName
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });

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
        <Text style={styles.label}>ชื่อ-นามสกุล</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="card-outline" size={20} color="#FF85A2" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="ระบุชื่อ-นามสกุลจริง"
          />
        </View>

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