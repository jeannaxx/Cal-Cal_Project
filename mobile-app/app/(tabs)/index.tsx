import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Profile = {
  kcal: string; days: string; gender: string;
  age: string; height: string; weight: string; targetWeight: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [eaten, setEaten] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem('userProfile').then(raw => {
      if (raw) setProfile(JSON.parse(raw));
    });
  }, []);

  const kcalGoal = parseInt(profile?.kcal ?? '1200');
  const remaining = kcalGoal - eaten;
  const percent = Math.min((eaten / kcalGoal) * 100, 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>สวัสดี! 👋</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString('th-TH', {
              weekday: 'long', day: 'numeric', month: 'long',
            })}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => router.push('/(tabs)/onboarding/index' as any)}
          >
            <Text style={styles.profileIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Calorie Card */}
        <View style={styles.kcalCard}>
          <Text style={styles.kcalLabel}>แคลอรี่วันนี้</Text>
          <Text style={styles.kcalRemain}>{remaining}</Text>
          <Text style={styles.kcalUnit}>kcal เหลือ</Text>

          {/* Progress Bar */}
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${percent}%` as any }]} />
          </View>

          <View style={styles.kcalRow}>
            <Text style={styles.kcalSub}>กิน {eaten} kcal</Text>
            <Text style={styles.kcalSub}>เป้า {kcalGoal} kcal</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🎯</Text>
            <Text style={styles.statValue}>{profile?.days ?? '30'}</Text>
            <Text style={styles.statLabel}>วันเป้าหมาย</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⚖️</Text>
            <Text style={styles.statValue}>{profile?.weight ?? '-'}</Text>
            <Text style={styles.statLabel}>น้ำหนักปัจจุบัน (กก.)</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🏁</Text>
            <Text style={styles.statValue}>{profile?.targetWeight ?? '-'}</Text>
            <Text style={styles.statLabel}>น้ำหนักเป้าหมาย (กก.)</Text>
          </View>
        </View>

        {/* Quick Add */}
        <Text style={styles.sectionTitle}>เพิ่มแคลอรี่ด่วน</Text>
        <View style={styles.quickRow}>
          {[100, 200, 300, 500].map(val => (
            <TouchableOpacity
              key={val}
              style={styles.quickBtn}
              onPress={() => setEaten(e => e + val)}
            >
              <Text style={styles.quickText}>+{val}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Reset */}
        <TouchableOpacity style={styles.resetBtn} onPress={() => setEaten(0)}>
          <Text style={styles.resetText}>รีเซ็ตวันนี้</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff5f7' },
  content: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  greeting: { fontSize: 20, fontWeight: '700', color: '#c23b6a' },
  date: { fontSize: 12, color: '#e07090', marginTop: 2 },
  profileBtn: { padding: 8 },
  profileIcon: { fontSize: 22 },

  kcalCard: {
    backgroundColor: '#fff', borderRadius: 20, borderWidth: 1.5,
    borderColor: '#f9c4d0', padding: 24, alignItems: 'center', marginBottom: 20,
  },
  kcalLabel: { fontSize: 13, color: '#e07090' },
  kcalRemain: { fontSize: 56, fontWeight: '700', color: '#e75480', marginTop: 4 },
  kcalUnit: { fontSize: 14, color: '#e07090', marginBottom: 16 },
  progressBg: {
    width: '100%', height: 10, backgroundColor: '#fde8ef',
    borderRadius: 10, overflow: 'hidden',
  },
  progressFill: { height: 10, backgroundColor: '#f472a0', borderRadius: 10 },
  kcalRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 8 },
  kcalSub: { fontSize: 12, color: '#e07090' },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 16,
    borderWidth: 1.5, borderColor: '#f9c4d0',
    padding: 12, alignItems: 'center',
  },
  statEmoji: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '700', color: '#c23b6a' },
  statLabel: { fontSize: 10, color: '#e07090', textAlign: 'center', marginTop: 2 },

  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#c23b6a', marginBottom: 12 },
  quickRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  quickBtn: {
    flex: 1, backgroundColor: '#fde8ef', borderRadius: 14,
    borderWidth: 1.5, borderColor: '#f9c4d0',
    paddingVertical: 12, alignItems: 'center',
  },
  quickText: { fontSize: 13, fontWeight: '600', color: '#e75480' },

  resetBtn: {
    borderWidth: 1.5, borderColor: '#f9c4d0', borderRadius: 24,
    paddingVertical: 12, alignItems: 'center',
  },
  resetText: { fontSize: 14, color: '#e07090' },
});