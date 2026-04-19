import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from './context/usecontext';
import { logout } from '../lib/authService';
import { supabase } from '../lib/supabase';
import axios from 'axios';
import { API_URL } from '../constants/Config';

export default function SettingsScreen() {
  const router = useRouter();
  const { setUserData } = useUser();
  const [isWalkSync, setIsWalkSync] = useState(false);
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);

  const handleLogout = async () => {
    Alert.alert('ยืนยันการออกจากระบบ', 'คุณต้องการออกจากระบบใช่หรือไม่?', [
      { text: 'ยกเลิก', style: 'cancel' },
      { 
        text: 'ตกลง', 
        onPress: async () => {
          try {
            await logout();
            setUserData({
              username: '', email: '', gender: null, age: '', height: '', weight: '', goalWeight: '', deficit: 0
            });
            router.replace('/(auth)/login' as any);
          } catch (error) {
            console.error(error);
            router.replace('/(auth)/login' as any);
          }
        }
      }
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'ยืนยันการลบบัญชี',
      'การดำเนินการนี้จะลบข้อมูลทั้งหมดของคุณและไม่สามารถกู้คืนได้ คุณต้องการลบบัญชีและออกจากระบบทันทีใช่หรือไม่?',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        { 
          text: 'ลบบัญชี', 
          style: 'destructive', 
          onPress: async () => {
            try {
              // 1. ดึง Session เพื่อเอา Access Token
              const { data: { session } } = await supabase.auth.getSession();
              const token = session?.access_token;

              // 2. ยิง API หลังบ้านเพื่อลบบัญชีจริง (Hard Delete)
              await axios.delete(`${API_URL}/profiles/me`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'ngrok-skip-browser-warning': 'true'
                }
              });

              // 3. ทำการ Logout ฝั่ง Client และล้างข้อมูลใน Context
              await supabase.auth.signOut();
              setUserData({
                username: '', email: '', gender: null, age: '', height: '', weight: '', goalWeight: '', deficit: 0
              });

              // 4. เด้งไปหน้า Login พร้อมแจ้งเตือนสำเร็จ
              router.replace('/(auth)/login' as any);
              Alert.alert('สำเร็จ', 'บัญชีและข้อมูลของคุณถูกลบออกจากระบบเรียบร้อยแล้ว');
            } catch (error) {
              console.error('Delete account error:', error);
              Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถลบบัญชีได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง');
            }
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>การตั้งค่า</Text>
          <View style={{ width: 28 }} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ข้อมูลส่วนตัวและเป้าหมาย</Text>
          <SettingItem 
            icon="refresh-outline" 
            label="ตั้งเป้าหมายข้อมูลใหม่" 
            onPress={() => router.push('/gender')} 
          />
          <SettingItem 
            icon="key-outline" 
            label="เปลี่ยนรหัสผ่าน" 
            onPress={() => router.push('/change-password')} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>แอปพลิเคชัน</Text>
          <SettingItem 
            icon="notifications-outline" 
            label="การแจ้งเตือน" 
            hasSwitch 
            value={isNotifEnabled} 
            onValueChange={setIsNotifEnabled} 
          />
          <SettingItem 
            icon="information-circle-outline" 
            label="เกี่ยวกับแอป" 
            onPress={() => alert('CAL-CAL Version 1.0.0\nเพื่อนช่วยนับแคลอรี่ของคุณ')} 
          />
        </View>

        <View style={[styles.section, { marginBottom: 40 }]}>
          <SettingItem icon="log-out-outline" label="ออกจากระบบ" color="#FF85A2" onPress={handleLogout} />
          <SettingItem icon="trash-outline" label="ลบบัญชีผู้ใช้" color="#FF4D4D" onPress={handleDeleteAccount} />
        </View>
      </ScrollView>
    </View>
  );
}

const SettingItem = ({ icon, label, onPress, hasSwitch, value, onValueChange, color = '#666' }: any) => (
  <TouchableOpacity style={styles.item} onPress={onPress} disabled={hasSwitch}>
    <View style={styles.iconBox}>
      <Ionicons name={icon} size={22} color={color === '#666' ? '#FF85A2' : color} />
    </View>
    <Text style={[styles.label, { color }]}>{label}</Text>
    {hasSwitch ? (
      <Switch 
        value={value} 
        onValueChange={onValueChange} 
        trackColor={{ false: "#eee", true: "#FFC2D1" }} 
        thumbColor={value ? "#FF85A2" : "#f4f3f4"} 
      />
    ) : (
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9FB' },
  headerBackground: { backgroundColor: '#FF85A2', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  header: { height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  backBtn: { padding: 5 },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#f472a0', marginBottom: 10, marginLeft: 10 },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 20, 
    marginBottom: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.05, 
    shadowRadius: 5 
  },
  iconBox: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#FFF0F3', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  label: { flex: 1, fontSize: 16, fontWeight: '600' },
});