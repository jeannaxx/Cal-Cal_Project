import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../constants/Config';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import Colors from '../constants/Colors';

interface UserProfile {
  full_name: string;
  avatar_url?: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  daily_calorie_goal?: number;
  goal_weight?: number;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // ดึงข้อมูลโปรไฟล์ปัจจุบัน
  const fetchProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await axios.get(`${API_URL}/profiles/me`, {
        headers: { 
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${session?.access_token}`
        }
      });
      setProfile(res.data);
    } catch (err) {
      console.error('Fetch profile error:', err);
      Alert.alert("Error", "ไม่สามารถดึงข้อมูลโปรไฟล์ได้");
    } finally {
      setLoading(false);
    }
  };

  // ดึงอีเมลจากระบบ Auth
  const fetchUserAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      setEmail(user.email);
    }
    if (user?.user_metadata?.username) {
      setUsername(user.user_metadata.username);
    }
  };

  // ฟังก์ชันเลือกรูปภาพจากเครื่อง
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true,
    });

    if (!result.canceled) {
      const base64Img = `data:image/jpeg;base64,${result.assets[0].base64}`;
      updateAvatar(base64Img);
    }
  };

  // อัปเดตรูปไปยัง Backend
  const updateAvatar = async (base64Data: string) => {
    try {
      setUploading(true);
      const { data: { session } } = await supabase.auth.getSession();
      await axios.put(`${API_URL}/profiles/me`, {
        avatar_url: base64Data
      }, {
        headers: { 
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${session?.access_token}`
        }
      });
      fetchProfile();
      Alert.alert("สำเร็จ", "เปลี่ยนรูปโปรไฟล์เรียบร้อยแล้ว");
    } catch (err) {
      Alert.alert("ผิดพลาด", "ไม่สามารถอัปโหลดรูปได้");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => { 
    fetchProfile(); 
    fetchUserAuth();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={28} color={Colors.textDeep} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>โปรไฟล์ของฉัน</Text>
        <TouchableOpacity onPress={() => router.push('/settings')} style={styles.iconBtn}>
          <Ionicons name="settings-outline" size={24} color={Colors.textDeep} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.imageWrapper}>
            {profile?.avatar_url ? (
              <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
            ) : (
              <Ionicons name="person" size={60} color={Colors.border} />
            )}
            {uploading && <ActivityIndicator style={styles.loader} color={Colors.primary} />}
            <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameText}>{profile?.full_name || username || 'ชื่อของคุณ'}</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>

        <View style={styles.mainContent}>
          {/* Stats Grid */}
          <View style={styles.statsRow}>
            <StatBox label="น้ำหนัก" value={profile?.weight} unit="kg" icon="scale-outline" color="#54A0FF" />
            <StatBox label="ส่วนสูง" value={profile?.height} unit="cm" icon="body-outline" color="#5FB8FF" />
            <StatBox label="อายุ" value={profile?.age} unit="ปี" icon="calendar-outline" color="#FF85A2" />
          </View>

          <Text style={styles.sectionTitle}>เป้าหมายของฉัน</Text>
          <GoalItem icon="flame" label="เป้าหมายพลังงาน" value={profile?.daily_calorie_goal} unit="kcal" />
          <GoalItem icon="flag" label="เป้าหมายน้ำหนัก" value={profile?.goal_weight} unit="kg" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const StatBox = ({ label, value, unit, icon, color }: any) => (
  <View style={styles.statBox}>
    <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <Text style={styles.statValueText}>{value || '--'}</Text>
    <Text style={styles.statLabelText}>{label} ({unit})</Text>
  </View>
);

const GoalItem = ({ icon, label, value, unit }: any) => (
  <View style={styles.goalCard}>
    <View style={styles.goalInfo}>
      <View style={styles.goalIconCircle}>
        <Ionicons name={icon} size={22} color={Colors.primary} />
      </View>
      <Text style={styles.goalLabel}>{label}</Text>
    </View>
    <Text style={styles.goalValue}>{value || '--'} <Text style={styles.goalUnit}>{unit}</Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 60 },
  iconBtn: { padding: 5 },
  topTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textDeep },
  scrollContent: { paddingBottom: 40 },
  profileHeader: { alignItems: 'center', marginVertical: 20 },
  imageWrapper: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: Colors.primary, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#fff' },
  loader: { position: 'absolute' },
  nameText: { fontSize: 24, fontWeight: 'bold', color: Colors.textDeep, marginTop: 15 },
  emailText: { fontSize: 14, color: '#888', marginTop: 5 },
  mainContent: { paddingHorizontal: 25 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  statBox: { width: '31%', backgroundColor: '#fff', padding: 15, borderRadius: 20, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  statIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  statValueText: { fontSize: 18, fontWeight: 'bold', color: Colors.textDeep },
  statLabelText: { fontSize: 10, color: '#888', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textDeep, marginBottom: 15, marginTop: 10 },
  goalCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 20, borderRadius: 20, marginBottom: 12, elevation: 1 },
  goalInfo: { flexDirection: 'row', alignItems: 'center' },
  goalIconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary + '15', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  goalLabel: { fontSize: 15, fontWeight: '600', color: '#555' },
  goalValue: { fontSize: 18, fontWeight: 'bold', color: Colors.primary },
  goalUnit: { fontSize: 12, fontWeight: 'normal', color: '#888' }
});