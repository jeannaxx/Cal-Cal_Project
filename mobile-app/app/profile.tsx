import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from './context/usecontext';
import { logout } from '../services/authService';

export default function ProfileScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUser();

  // คำนวณเป้าหมายแคลอรี่จากข้อมูลจริงใน Context
  const suggestedCal = useMemo(() => {
    const weight = parseFloat(userData.weight);
    const height = parseFloat(userData.height);
    const age = parseFloat(userData.age);
    const gender = userData.gender;
    const deficit = userData.deficit || 0;

    if (weight && height && age && gender) {
      let bmr = 0;
      if (gender === 'M') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      const tdee = bmr * 1.2;
      return Math.max(Math.round(tdee - deficit), 1000);
    }
    return 0;
  }, [userData]);

  // ฟังก์ชันสำหรับออกจากระบบ
  const handleLogout = async () => {
    try {
      await logout(); // เรียก signOut จาก Supabase
      // ล้างข้อมูลใน Context ให้กลับเป็นค่าเริ่มต้น
      setUserData({
        username: '',
        email: '',
        gender: null,
        age: '',
        height: '',
        weight: '',
        goalWeight: '',
        deficit: 0
      });
      router.replace('/(auth)/login' as any); // เด้งไปหน้า Login ทันที
    } catch (error) {
      console.error('Logout failed:', error);
      router.replace('/(auth)/login' as any);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>โปรไฟล์ของฉัน</Text>
          <View style={{ width: 28 }} /> 
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ส่วนรูปโปรไฟล์ */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={60} color="#FFC2D1" />
            </View>
            <TouchableOpacity style={styles.editImageBtn}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userData.username || 'ผู้ใช้งาน'}</Text>
          <Text style={styles.userEmail}>{userData.email || 'ยังไม่ได้ระบุอีเมล'}</Text>
        </View>

        {/* ส่วนสถิติย่อ */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{userData.height || '-'}</Text>
            <Text style={styles.statLabel}>ส่วนสูง (ซม.)</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{userData.weight || '-'}</Text>
            <Text style={styles.statLabel}>น้ำหนัก (กก.)</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{userData.age || '-'}</Text>
            <Text style={styles.statLabel}>อายุ (ปี)</Text>
          </View>
        </View>

        {/* รายการเมนูข้อมูล */}
        <View style={styles.infoSection}>
          <ProfileItem 
            icon="heart-outline" 
            label="เป้าหมายแคลอรี่" 
            value={suggestedCal > 0 ? `${suggestedCal.toLocaleString()} kcal` : 'ยังไม่ได้คำนวณ'} 
          />
          <ProfileItem 
            icon="male-female-outline" 
            label="เพศ" 
            value={userData.gender === 'M' ? 'ชาย' : userData.gender === 'F' ? 'หญิง' : 'ไม่ระบุ'} 
          />
          <ProfileItem icon="calendar-clear-outline" label="เป้าหมายน้ำหนัก" value={`${userData.goalWeight || '-'} กก.`} />
          
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>ออกจากระบบ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const ProfileItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <View style={styles.infoItem}>
    <View style={styles.infoIconBox}>
      <Ionicons name={icon} size={22} color="#FF85A2" />
    </View>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9FB' },
  headerBackground: { backgroundColor: '#FF85A2', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  header: { height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  backBtn: { padding: 5 },
  profileSection: { alignItems: 'center', marginTop: 50 },
  avatarWrapper: { position: 'relative' },
  avatarPlaceholder: { 
    width: 120, height: 120, borderRadius: 60, backgroundColor: '#fff', 
    justifyContent: 'center', alignItems: 'center',
    elevation: 10, shadowColor: '#FF85A2', shadowOpacity: 0.2, shadowRadius: 15
  },
  editImageBtn: { 
    position: 'absolute', bottom: 0, right: 0, 
    backgroundColor: '#FF85A2', width: 36, height: 36, 
    borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderColor: '#fff' 
  },
  userName: { fontSize: 24, fontWeight: '800', color: '#444', marginTop: 15 },
  userEmail: { fontSize: 14, color: '#888', marginTop: 5 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginTop: 30 },
  statCard: { 
    backgroundColor: '#fff', padding: 15, borderRadius: 20, width: '28%', 
    alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 
  },
  statVal: { fontSize: 18, fontWeight: '800', color: '#FF85A2' },
  statLabel: { fontSize: 10, color: '#999', marginTop: 5 },
  infoSection: { marginTop: 30, paddingHorizontal: 25, paddingBottom: 40 },
  infoItem: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', 
    padding: 15, borderRadius: 20, marginBottom: 15,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.03 
  },
  infoIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF0F3', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  infoLabel: { flex: 1, fontSize: 15, color: '#666', fontWeight: '600' },
  infoValue: { fontSize: 15, color: '#444', fontWeight: '700' },
  logoutBtn: { marginTop: 20, padding: 15, alignItems: 'center' },
  logoutText: { color: '#FF85A2', fontWeight: '800', fontSize: 16 }
});